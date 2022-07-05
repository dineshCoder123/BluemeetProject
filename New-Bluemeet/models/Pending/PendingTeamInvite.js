// Whenever a user signs up, then check if he / she has a pending doc on his email if yes then do as required (see next lines)
// ** For pending team invite ask them to accept / reject and mark this invite as complete
// ** For pending speaker invite register them into event as a speaker and mark this invite as complete
// ** For pending booth invite register them into event as a exhibitor and mark this invite as complete
// ** For pending registration invite ask them to register into that event and mark this invite as complete

// ? Every invite will have a status of either Complete or In progress
//  Only take action on a invite if its status is In progress

// While entering into meet everyone using magic link we will check if 

// user is on platform then take him / her into event using registration doc details and log him / her in application as that user
// speaker is on platform then take him / her into event using registration doc details and log him / her in application as that user
// exhibitor is on platform then take him / her into event using registration doc details and log him / her in application as that user

//  Pending Team invite by email

// event/invite/attendee/:registrationId => magic link for attendees
// event/invite/speaker/:registrationId => magic link for speakers
// event/invite/booth/:registrationId => magic link for exhibitors