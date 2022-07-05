const mongoose = require("mongoose");

const communityRolesSchema = new mongoose.Schema(
  {
    create_new_event: { type: Boolean },
    add_new_members: { type: Boolean },
    remove_members: { type: Boolean },
    edit_event_basic_details: { type: Boolean },
    edit_event_description: { type: Boolean },
    start_event: { type: Boolean },
    end_event: { type: Boolean },
    publish_event: { type: Boolean },
    add_and_edit_agenda: { type: Boolean },
    add_and_edit_speakers: { type: Boolean },
    add_and_edit_booths: { type: Boolean },
    add_and_edit_sponsors: { type: Boolean },
    add_and_edit_tickets: { type: Boolean },
    add_and_edit_coupons: { type: Boolean },
    add_and_edit_affiliates: { type: Boolean },
    manage_google_analytics_and_facebook_pixel: { type: Boolean },
    add_attendees_via_csv_or_manually: { type: Boolean },
    setup_event_entry_rule: { type: Boolean },
    setup_registration_form: { type: Boolean },
    setup_reception: { type: Boolean },
    manage_venue_customisation: { type: Boolean },
    manage_stage_vibes: { type: Boolean },
    edit_community_profile: { type: Boolean },
    manage_access_to_agenda_activities: { type: Boolean },
    manage_stripe: { type: Boolean },
    manage_billing: { type: Boolean },
    add_videos_to_library: { type: Boolean },
    view_and_download_various_reports: { type: Boolean },
    setup_integrations: { type: Boolean },
    manage_session_recordings: { type: Boolean },
    send_mail_to_attendees: { type: Boolean },
    send_mail_to_speakers: { type: Boolean },
    send_mail_to_exhibitors: { type: Boolean },
    customize_tables: { type: Boolean },
    customize_booths: { type: Boolean },
    setup_live_stream: { type: Boolean },
    create_new_role: { type: Boolean },
    change_other_members_role: { type: Boolean },
    change_community_billing_plans_or_add_addons: { type: Boolean },
    communityId: {
      type: String,
    },
    title: {
      type: String,
    },
    assignedTo: [
      {
        type: mongoose.Schema.ObjectId, // Ids of users who are assigned this role
        ref: "User",
      },
    ],
    lastUpdatedAt: {
      type: Date,
    },
    lastUpdatedBy: {
      type: mongoose.Schema.ObjectId, // Id of user who updated this role.
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CommunityRoles = mongoose.model("CommunityRoles", communityRolesSchema);
module.exports = CommunityRoles;
