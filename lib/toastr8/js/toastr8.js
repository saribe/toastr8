/*
 * Toastr8
 * Version 1.0.0
 * Copyright 2013 Samuel Pinto.  
 * All Rights Reserved.  
 * Use, reproduction, distribution, and modification of this code is subject to the terms and 
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Samuel Pinto
 * Project: https://github.com/samuelbigas/toastr8
 */

; (function (define) {
    define(['jquery', 'toastr'], function ($, toastr) {
        return (function () {
            var defaultOptions = $.extend(true, {}, toastr.options),
                options = {
                    tapToDismiss: true,
                    toastClass: 'toast8',
                    containerId: 'toast8-container',
                    closeButton: true,
                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    extendedTimeOut: 1000,
                    iconClasses: { info: 'toast8-info' },
                    iconClass: 'toast8-info',
                    positionClass: 'toast8-top-right',
                    timeOut: 5000, // Set timeOut and extendedTimeout to 0 to make it sticky
                    titleClass: 'toast8-title',
                    messageClass: 'toast8-message'
                };

            //#region Internal Methods
            var resetOptions = function () {
                /// <summary>Restore the original toastr settings</summary>
                toastr.options = defaultOptions;
            },
                setWin8Class = function (version) {
                    /// <summary>Refactor the settings to toastr8</summary>
                    /// <param name="version" type="Object">The message type name</param>
                    options.iconClasses = { info: 'toast8-' + (version || "info") };
                    toastr.options = options;
                },
                addDomToToastr = function (moodleName, imgClass, logoClass) {
                    /// <summary>Adds new dom elements to notification</summary>
                    /// <param name="moodleName" type="Object">Style name</param>
                    /// <param name="imgClass" type="Object">Css Class to image on left</param>
                    /// <param name="logoClass" type="Object">Css Class to vendor on left</param>

                    var selector = $("." + toastr.options.toastClass + "-" + moodleName + ":first-child");
                    selector.append("<i class='" + logoClass + "'></i>");
                    if (imgClass) selector.prepend("<i class='" + imgClass + "'></i>");
                    else selector.addClass("toast8-fullsize");
                    $(".toast-close-button").attr("class", "toast8-close-button");
                },
                notify = function (moodleName, message, title, overrideOptions, imgClass, logoClass) {
                    /// <summary>Mesage handler</summary>
                    /// <param name="moodleName" type="Object">Style moodle Name</param>
                    /// <param name="message" type="Object">Message to show</param>
                    /// <param name="title" type="Object">Title of message to be show</param>
                    /// <param name="overrideOptions" type="Object">Temporary options for this notification</param>
                    /// <param name="imgClass" type="Object">Css Class to image on left</param>
                    /// <param name="logoClass" type="Object">Css Class to vendor logo on right</param>

                    setWin8Class(moodleName);
                    var sendItBack = toastr.info(message, title, overrideOptions);

                    addDomToToastr(moodleName, imgClass, logoClass);
                    resetOptions();

                    return sendItBack;
                };
            //#endregion

            //#region animations
            //
            //#endregion

            //#region Accessible Methods
            var facebook = function () {
                    return notify("facebook", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-facebook");
                },
                info = function () {
                    return notify("info", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-info");
                },
                error = function () {
                    return notify("error", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-ban");
                },
                warning = function () {
                    return notify("warning", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-exclamation");
                },
                success = function () {
                    return notify("success", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-check");
                },
                twitter = function () {
                    return notify("twitter", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-twitter");
                },
                linkedin = function () {
                    return notify("linkedin", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-linkedin");
                },
                windows = function () {
                    return notify("windows", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-windows");
                },
                googlePlus = function () {
                    return notify("google-plus", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-google-plus");
                },
                skype = function () {
                    return notify("skype", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-skype");
                },
                linux = function () {
                    return notify("linux", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-linux");
                },
                github = function () {
                    return notify("github", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-github");
                },
                android = function () {
                    return notify("android", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] || "fa fa-android");
                };

            //#endregion

            return {
                options: options,
                facebook: facebook,
                info: info,
                error: error,
                warning: warning,
                success: success,
                twitter: twitter,
                windows: windows,
                android: android,
                linkedin: linkedin,
                googlePlus: googlePlus,
                skype: skype,
                linux: linux,
                github: github
            };

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require(deps[0]));
    } else {
        window['toastr8'] = factory(window['jQuery'], window['toastr']);
    }
}));