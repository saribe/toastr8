/*//
 * Toastr8
 * Version 1.0.3
 * Copyright 2013 Samuel Ribeiro Pinto.  
 * All Rights Reserved.  
 * Use, reproduction, distribution, and modification of this code is subject to the terms and 
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Samuel Ribeiro Pinto
 * Project: https://github.com/saribe/toastr8
 */

; (function (define) {
    define(['jquery'], function ($) {
        return (function () {
            var $container;
            var listener;
            var toastId = 0;
            var version = '1.0.3';

            // viewModel
            var vm = {
                /// <summary>The module it self. Revealing Module Pattern.</summary>
                android: android,
                clear: clear,
                error: error,
                facebook: facebook,
                getActualOptions: getActualOptions,
                github: github,
                googlePlus: googlePlus,
                info: info,
                linkedin: linkedin,
                linux: linux,
                options: {},
                skype: skype,
                subscribe: subscribe,
                success: success,
                twitter: twitter,
                version: version,
                warning: warning,
                windows: windows
            };

            return vm;

            //#region Internal Methods
            function buildToast(map) {
                /// <summary>Toast container handler</summary>
                /// <param name="map.type"              type="string">Style moodle Name</param>
                /// <param name="map.message"           type="string">Message to show</param>
                /// <param name="map.title"             type="string">Title of message to be show</param>
                /// <param name="map.timeOut"           type="int">Display duration of notification.</param>
                /// <param name="map.imgClass"          type="string">Css Class to image on left block</param>
                /// <param name="map.imgURI"            type="string[] || string">Array or single url to try use in left block</param>
                /// <param name="map.iconClass"         type="string">Css Class to vendor logo on right</param>

                var options = getActualOptions();
                var iconClass = map.iconClass || options.iconClass;
                var intervalId = null;
                var $toastElement = $('<table/>')
                    .append('<tbody/>')
                    .append('<tr/>')
                    .addClass(options.toastClass + ' ' + options.toastClass + '-' + map.type)
                    .find('tr');
                var $messageContainer = createBlock('td', null, options.centerBlockClass);
                var $closeElement = $(options.closeHtml);
                var response = {
                    map: map,
                    options: options,
                    startTime: new Date(),
                    state: 'visible',
                    toastId: toastId
                };

                if (typeof (map) !== 'undefined') {
                    options = $.extend(options, map);
                    iconClass = map.iconClass || iconClass;
                }

                toastId++;

                $container = getContainer(options);

                if (map.imgClass) {
                    $toastElement.append(createBlock('td', null, options.leftBlockClass + ' ' + map.imgClass));
                }
                else if (map.imgURI) {
                    var style = 'background-size: 100% auto;';
                    for (var i = 0, k = map.imgURI.length; i < k; i++) {
                        style += 'background-image: url(\'' + map.imgURI[i] + '\');';
                    }

                    $toastElement.append(createBlock('td', null, options.leftBlockClass).attr('style', style));
                }


                if (map.title) {
                    $messageContainer.append(createBlock('div', map.title, options.titleClass));
                }

                if (map.message) {
                    $messageContainer.append(createBlock('div', map.message, options.messageClass));
                }
                if (map.iconClass || options.closeButton) {
                    $toastElement.append($messageContainer).append(createBlock('td', null, options.rightBlockClass));

                    if (options.closeButton) {
                        $toastElement.find('.' + options.rightBlockClass).append($closeElement);
                    }

                    if (map.iconClass && map.iconClass !== 'none')
                        $toastElement.find('.' + options.rightBlockClass).append(createBlock('i', null, map.iconClass));
                }


                $toastElement = $toastElement.parent().parent();
                $toastElement.hide();
                if (options.newestOnTop) {
                    $container.prepend($toastElement);
                } else {
                    $container.append($toastElement);
                }


                $toastElement[options.showMethod](
                	{ duration: options.showDuration, easing: options.showEasing, complete: options.onShown }
                );
                if (options.timeOut > 0) {
                    intervalId = setTimeout(hideToast, options.timeOut);
                }

                $toastElement.hover(stickAround, delayedhideToast);
                if (!options.onclick && options.tapToDismiss) {
                    $toastElement.click(hideToast);
                }
                if (options.closeButton && $closeElement) {
                    $closeElement.click(function (event) {
                        event.stopPropagation();
                        closeToast(true);
                    });
                }

                if (options.onclick) {
                    $toastElement.click(function () {
                        options.onclick();
                        hideToast();
                    });
                }

                publish(response);

                if (options.debug && console) {
                    console.log(response);
                }

                return $toastElement;

                function createBlock(elem, text, $class) {
                    return $('<' + elem + '/>').append(text).addClass($class);
                }

                function closeToast(override) {
                    if ($(':focus', $toastElement).length && !override) { return null; }

                    return $toastElement.addClass('slideOutRight').delay(1000).queue(function () {
                        if (options.onHidden) {
                            options.onHidden();
                        }
                        response.state = 'hidden';
                        response.endTime = new Date(),
                        publish(response);
                        $toastElement.remove();
                    });
                }

                function hideToast(override) {
                    if ($(':focus', $toastElement).length && !override) {
                        return null;
                    }
                    return $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () {
                            removeToast($toastElement);
                            if (options.onHidden) {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date(),
                			publish(response);
                        }
                    });
                }

                function delayedhideToast() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    $toastElement.stop(true, true)[options.showMethod](
                		{ duration: options.showDuration, easing: options.showEasing }
                	);
                }
            }

            function removeToast($toastElement) {
                if (!$container) { $container = getContainer(); }
                if ($toastElement.is(':visible')) {
                    return;
                }
                $toastElement.remove();
                if ($container.children().length === 0) {
                    $container.remove();
                }
            }
            function publish(args) {
                if (!listener) {
                    return;
                }
                listener(args);
            }

            function getActualOptions() {
                return $.extend({}, getDefaultOptions(), vm.options);
            }
            function getDefaultOptions() {
                return {
                    centerBlockClass: 'toast8-message-container',
                    closeButton: true,
                    closeHtml: '<button class=\'toast8-close-button\'>×</button>',
                    containerId: 'toast8-container',
                    debug: false,
                    extendedTimeOut: 1000,
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    hideMethod: 'fadeOut',
                    iconClass: 'toast8-info',
                    leftBlockClass: 'toast8-avatar-container',
                    messageClass: 'toast8-message',
                    newestOnTop: true,
                    onShown: undefined,
                    positionClass: 'toast8-top-right',
                    rightBlockClass: 'toast8-right-container',
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    tapToDismiss: true,
                    target: 'body',
                    timeOut: 5000, // Set timeOut and extendedTimeout to 0 to make it sticky
                    titleClass: 'toast8-title',
                    toastClass: 'toast8',
                    iconClasses: {
                        android: 'fa fa-android',
                        error: 'fa fa-ban',
                        facebook: 'fa fa-facebook',
                        github: 'fa fa-github',
                        googlePlus: 'fa fa-google-plus',
                        info: 'fa fa-info',
                        linkedin: 'fa fa-linkedin',
                        linux: 'fa fa-linux',
                        skype: 'fa fa-skype',
                        success: 'fa fa-check',
                        twitter: 'fa fa-twitter',
                        warning: 'fa fa-exclamation',
                        windows: 'fa fa-windows'
                    }
                };
            }
            function getContainer(options) {
                if (!options) { options = getActualOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                $container = $('<div/>')
					.attr('id', options.containerId)
					.addClass(options.positionClass);
                $container.appendTo($(options.target));
                return $container;
            }
            function unwrapArguments(args, type, iconClass/*, extraClass*/) {
                if (args && typeof (args[0]) === 'object') {
                    args[0].type = type;
                    if (!args[0].iconClass)
                        args[0].iconClass = iconClass;
                    if (typeof args[0].imgURI == 'string') {
                        args[0].imgURI = [args[0].imgURI];
                    }
                    return fixTimeOut(args[0], type);
                }

                return fixTimeOut({
                    type: type,
                    message: args[0],
                    title: args[1],
                    imgClass: args[3] || null,
                    iconClass: args[4] || iconClass
                }, type);

                function fixTimeOut(obj, t) {

                    if (typeof obj.timeOut == 'number')
                        return obj;

                    var timeOut = getDefaultOptions().timeOut;
                    switch (t) {
                        case 'warning':
                            obj.timeOut = timeOut * 2;
                            break;
                        case 'error':
                            obj.timeOut = timeOut * 3;
                            break;
                    }
                    return obj;
                }
            }
            //#endregion

            //#region Accessible Methods
            function facebook() {
                return buildToast(unwrapArguments(arguments, 'facebook', getActualOptions().iconClasses.facebook));
            }
            function info() {
                return buildToast(unwrapArguments(arguments, 'info', getActualOptions().iconClasses.info));
            }
            function error() {
                return buildToast(unwrapArguments(arguments, 'error', getActualOptions().iconClasses.error));
            }
            function warning() {
                return buildToast(unwrapArguments(arguments, 'warning', getActualOptions().iconClasses.warning));
            }
            function success() {
                return buildToast(unwrapArguments(arguments, 'success', getActualOptions().iconClasses.success));
            }
            function twitter() {
                return buildToast(unwrapArguments(arguments, 'twitter', getActualOptions().iconClasses.twitter));
            }
            function linkedin() {
                return buildToast(unwrapArguments(arguments, 'linkedin', getActualOptions().iconClasses.linkedin));
            }
            function windows() {
                return buildToast(unwrapArguments(arguments, 'windows', getActualOptions().iconClasses.windows));
            }
            function googlePlus() {
                return buildToast(unwrapArguments(arguments, 'google-plus', getActualOptions().iconClasses.googlePlus));
            }
            function skype() {
                return buildToast(unwrapArguments(arguments, 'skype', getActualOptions().iconClasses.skype));
            }
            function linux() {
                return buildToast(unwrapArguments(arguments, 'linux', getActualOptions().iconClasses.linux));
            }
            function github() {
                var actualOptions = getActualOptions();
                var extraClass = { titleClass: actualOptions.titleClass + ' text-danger', messageClass: actualOptions.messageClass + ' text-muted' };

                return buildToast($.extend(extraClass, unwrapArguments(arguments, 'github', actualOptions.iconClasses.github, extraClass)));
            }
            function android() {
                return buildToast(unwrapArguments(arguments, 'android', getActualOptions().iconClasses.android));
            }

            function subscribe(callback) {
                listener = callback;
            }
            function clear($toastElement) {
                var localOptions = getActualOptions();
                if (!$container) { getContainer(options); }
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    $toastElement[localOptions.hideMethod]({
                        duration: localOptions.hideDuration,
                        easing: localOptions.hideEasing,
                        complete: function () { removeToast($toastElement); }
                    });
                    return;
                }
                if ($container.children().length) {
                    $container[localOptions.hideMethod]({
                        duration: localOptions.hideDuration,
                        easing: localOptions.hideEasing,
                        complete: function () { $container.remove(); }
                    });
                }
            }
            //#endregion
        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof window.module !== 'undefined' && window.module.exports) { //Node
        window.module.exports = factory(window.require(deps[0]));
    } else {
        window.toastr8 = factory(window.jQuery);
    }
}));