# Demo for Municipal Forms Proposal RFP

This application was initially intended to be a small demo that accompanied a proposal I submitted for a pilot project.

However, it occurred to me that it might also be useful to the new Meteor developer who is looking for something slightly more
challenging than a leaderboard or to-do list app.

If you're a Meteor beginner, here are a few things you can learn with this app:

- How to use the popular AutoForm package to manage forms, including storing submitted form data in MongoDB
- How to supercharge AutoForm by using its excellent companion packages: SimpleSchema and Collection2
- How to add a Google ReCAPTCHA widget to your form to protect against spambots
- How to trigger dynamic email notifications (in this case from a form submission, but once you learn the pattern, you can use it for lots of things)
- How to store sensitive data, such as your private Google ReCAPTCHA key in a settings file so it stays out of your code repository
- How to easily create a full-featured table of MongoDB data so that, say, your client or manager can review form data
- How to allow users to drill down into an update or read-only version of the form for more granular analysis
- How to add Modal dialog boxes to your app
- How to use the timestampable package to make it easy to add timestamps to all inserts and updates
- How to dynamically add 'active' classes to navigation items via iron router with the active-route package
- How to dynamically show and hide form elements (or anything else) with animation, based on previously selected form fields
- How to add mobile-friendly toggle style radio buttons to your forms
- And much more

Feel free to clone this project, configure your own settings.json file, then deploy it to meteor.com

If you have questions, contact me via email or add an issue in this repo.

Because this is purely a demo/prototype, I am aware that the autopublish and insecure packages are still active.
