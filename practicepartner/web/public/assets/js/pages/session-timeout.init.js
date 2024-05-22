/*
Template Name: Dason - Admin & Dashboard Template
Author: Themesdesign
Website: https://themesdesign.in/
Contact: themesdesign.in@gmail.com
File: Session Timeout Js File
*/

$.sessionTimeout({
  keepAliveUrl: "/",
  logoutButton: "Logout",
  logoutUrl: "/logout",
  redirUrl: "auth-lock-screen.html",
  warnAfter: 3000,
  redirAfter: 3000,
  countdownMessage: "Redirecting in {timer} seconds.",
});

$("#session-timeout-dialog  [data-dismiss=modal]").attr(
  "data-bs-dismiss",
  "modal"
);
