import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Divider from "@material-ui/core/Divider";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { editRoleCapabilities } from "./../../../actions";
import { useSelector } from "react-redux";


const Heading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.3rem;
  color: #212121;
`;
const SubHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.1rem;
  color: #212121;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.76rem;
  color: #494949;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditRole = ({ open, handleClose }) => {
  const params = useParams();

  const { roleDetails, isLoading, error } = useSelector((state) => state.role);

  const dispatch = useDispatch();

  const userId = params.userId;
  const communityId = params.id;

  const [roleTitle, setRoleTitle] = useState(roleDetails.title);

  const [p_1, setP_1] = useState(roleDetails.create_new_event);
  const [p_2, setP_2] = useState(roleDetails.add_new_members);
  const [p_3, setP_3] = useState(roleDetails.remove_members);
  const [p_4, setP_4] = useState(roleDetails.edit_event_basic_details);
  const [p_5, setP_5] = useState(roleDetails.edit_event_description);
  const [p_6, setP_6] = useState(roleDetails.start_event);
  const [p_7, setP_7] = useState(roleDetails.end_event);
  const [p_8, setP_8] = useState(roleDetails.publish_event);
  const [p_9, setP_9] = useState(roleDetails.add_and_edit_agenda);
  const [p_10, setP_10] = useState(roleDetails.add_and_edit_speakers);
  const [p_11, setP_11] = useState(roleDetails.add_and_edit_booths);
  const [p_12, setP_12] = useState(roleDetails.add_and_edit_sponsors);
  const [p_13, setP_13] = useState(roleDetails.add_and_edit_tickets);
  const [p_14, setP_14] = useState(roleDetails.add_and_edit_coupons);
  const [p_15, setP_15] = useState(roleDetails.add_and_edit_affiliates);
  const [p_16, setP_16] = useState(
    roleDetails.manage_google_analytics_and_facebook_pixel
  );
  const [p_17, setP_17] = useState(
    roleDetails.add_attendees_via_csv_or_manually
  );
  const [p_18, setP_18] = useState(roleDetails.setup_event_entry_rule);
  const [p_19, setP_19] = useState(roleDetails.setup_registration_form);
  const [p_20, setP_20] = useState(roleDetails.setup_reception);
  const [p_21, setP_21] = useState(roleDetails.manage_venue_customisation);
  const [p_22, setP_22] = useState(roleDetails.manage_stage_vibes);
  const [p_23, setP_23] = useState(roleDetails.edit_community_profile);
  const [p_24, setP_24] = useState(
    roleDetails.manage_access_to_agenda_activities
  );
  const [p_25, setP_25] = useState(roleDetails.manage_stripe);
  const [p_26, setP_26] = useState(roleDetails.manage_billing);
  const [p_27, setP_27] = useState(roleDetails.add_videos_to_library);
  const [p_28, setP_28] = useState(
    roleDetails.view_and_download_various_reports
  );
  const [p_29, setP_29] = useState(roleDetails.setup_integrations);
  const [p_30, setP_30] = useState(roleDetails.manage_session_recordings);
  const [p_31, setP_31] = useState(roleDetails.send_mail_to_attendees);
  const [p_32, setP_32] = useState(roleDetails.send_mail_to_speakers);
  const [p_33, setP_33] = useState(roleDetails.send_mail_to_exhibitors);
  const [p_34, setP_34] = useState(roleDetails.customize_tables);
  const [p_35, setP_35] = useState(roleDetails.customize_booths);
  const [p_36, setP_36] = useState(roleDetails.setup_live_stream);
  const [p_37, setP_37] = useState(roleDetails.createNewRole);
  const [p_38, setP_38] = useState(roleDetails.change_other_members_role);
  const [p_39, setP_39] = useState(
    roleDetails.change_community_billing_plans_or_add_addons
  );

  if(isLoading) {
    return <>

    </>
}
if(error) {
    return <div>Something went wrong</div>
}

  const formValues = {
    create_new_event: p_1,
    add_new_members: p_2,
    remove_members: p_3,
    edit_event_basic_details: p_4,
    edit_event_description: p_5,
    start_event: p_6,
    end_event: p_7,
    publish_event: p_8,
    add_and_edit_agenda: p_9,
    add_and_edit_speakers: p_10,
    add_and_edit_booths: p_11,
    add_and_edit_sponsors: p_12,
    add_and_edit_tickets: p_13,
    add_and_edit_coupons: p_14,
    add_and_edit_affiliates: p_15,
    manage_google_analytics_and_facebook_pixel: p_16,
    add_attendees_via_csv_or_manually: p_17,
    setup_event_entry_rule: p_18,
    setup_registration_form: p_19,
    setup_reception: p_20,
    manage_venue_customisation: p_21,
    manage_stage_vibes: p_22,
    edit_community_profile: p_23,
    manage_access_to_agenda_activities: p_24,
    manage_stripe: p_25,
    manage_billing: p_26,
    add_videos_to_library: p_27,
    view_and_download_various_reports: p_28,
    setup_integrations: p_29,
    manage_session_recordings: p_30,
    send_mail_to_attendees: p_31,
    send_mail_to_speakers: p_32,
    send_mail_to_exhibitors: p_33,
    customize_tables: p_34,
    customize_booths: p_35,
    setup_live_stream: p_36,
    create_new_role: p_37,
    change_other_members_role: p_38,
    change_community_billing_plans_or_add_addons: p_39,
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form>
          <AppBar sx={{ position: "relative", backgroundColor: "#538BF7" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Create New Role
              </Typography>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    editRoleCapabilities(
                      formValues,
                      roleDetails.id,
                      communityId,
                      userId
                    )
                  );
                }}
                className="btn btn-light btn-outline-text me-3"
              >
                <span> Edit role </span>
              </button>
            </Toolbar>
          </AppBar>
          <div className="container py-4">
            <Heading className="mb-5">Role information</Heading>

            <div className="mb-4">
              <FormLabel className="mb-1">Role Title</FormLabel>
              <input
                required
                onChange={(e) => {
                  setRoleTitle(e.target.value);
                }}
                type="text"
                value={roleTitle}
                placeholder="Give this role a suitable title"
                className="form-control"
              ></input>
            </div>
            <SubHeading className="mb-4">Permissions</SubHeading>
            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_1(e.target.checked);
                    }}
                    checked={p_1}
                  />
                }
                label="Create new event"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_2(e.target.checked);
                    }}
                    checked={p_2}
                  />
                }
                label="Add new members"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_3(e.target.checked);
                    }}
                    checked={p_3}
                  />
                }
                label="Remove members (except super admin)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_4(e.target.checked);
                    }}
                    checked={p_4}
                  />
                }
                label="Edit event basic details (Name, Timeline, Timezone, Visibility, tags)."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_5(e.target.checked);
                    }}
                    checked={p_5}
                  />
                }
                label="Edit event description."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_6(e.target.checked);
                    }}
                    checked={p_6}
                  />
                }
                label="Start event"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_7(e.target.checked);
                    }}
                    checked={p_7}
                  />
                }
                label="End event"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_8(e.target.checked);
                    }}
                    checked={p_8}
                  />
                }
                label="Publish event"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_9(e.target.checked);
                    }}
                    checked={p_9}
                  />
                }
                label="Add & edit agenda"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_10(e.target.checked);
                    }}
                    checked={p_10}
                  />
                }
                label="Add & edit speakers"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_11(e.target.checked);
                    }}
                    checked={p_11}
                  />
                }
                label="Add & edit booths"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_12(e.target.checked);
                    }}
                    checked={p_12}
                  />
                }
                label="Add & edit sponsors"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_13(e.target.checked);
                    }}
                    checked={p_13}
                  />
                }
                label="Add & edit tickets"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_14(e.target.checked);
                    }}
                    checked={p_14}
                  />
                }
                label="Add & edit coupons"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_15(e.target.checked);
                    }}
                    checked={p_15}
                  />
                }
                label="Add & edit affiliates"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_16(e.target.checked);
                    }}
                    checked={p_16}
                  />
                }
                label="Manage google analytics and facebook pixel settings."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_17(e.target.checked);
                    }}
                    checked={p_17}
                  />
                }
                label="Add attendees via CSV or manually"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_18(e.target.checked);
                    }}
                    checked={p_18}
                  />
                }
                label="Set up event entry rules."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_19(e.target.checked);
                    }}
                    checked={p_19}
                  />
                }
                label="Set up event registration form."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_20(e.target.checked);
                    }}
                    checked={p_20}
                  />
                }
                label="Set up reception."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_21(e.target.checked);
                    }}
                    checked={p_21}
                  />
                }
                label="Manage venue customisation."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_22(e.target.checked);
                    }}
                    checked={p_22}
                  />
                }
                label="Manage stage vibes."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_23(e.target.checked);
                    }}
                    checked={p_23}
                  />
                }
                label="Edit Community profile."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_24(e.target.checked);
                    }}
                    checked={p_24}
                  />
                }
                label="Manage access to various activities in agenda."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_25(e.target.checked);
                    }}
                    checked={p_25}
                  />
                }
                label="Manage stripe payout"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_26(e.target.checked);
                    }}
                    checked={p_26}
                  />
                }
                label="Manage billing."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_27(e.target.checked);
                    }}
                    checked={p_27}
                  />
                }
                label="Add videos to library."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_28(e.target.checked);
                    }}
                    checked={p_28}
                  />
                }
                label="View and download various reports."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_29(e.target.checked);
                    }}
                    checked={p_29}
                  />
                }
                label="Set up integrations."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_30(e.target.checked);
                    }}
                    checked={p_30}
                  />
                }
                label="Manage session recordings."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_31(e.target.checked);
                    }}
                    checked={p_31}
                  />
                }
                label="Send Mails to Attendees."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_32(e.target.checked);
                    }}
                    checked={p_32}
                  />
                }
                label="Send Mails to Speakers."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_33(e.target.checked);
                    }}
                    checked={p_33}
                  />
                }
                label="Send Mails to Exhibitors."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_34(e.target.checked);
                    }}
                    checked={p_34}
                  />
                }
                label="Customize tables at venue"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_35(e.target.checked);
                    }}
                    checked={p_35}
                  />
                }
                label="Customize booths at venue"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_36(e.target.checked);
                    }}
                    checked={p_36}
                  />
                }
                label="Set up live stream."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_37(e.target.checked);
                    }}
                    checked={p_37}
                  />
                }
                label="Create new role"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_38(e.target.checked);
                    }}
                    checked={p_38}
                  />
                }
                label="Change other members role."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setP_39(e.target.checked);
                    }}
                    checked={p_39}
                  />
                }
                label="Change community billing plan or add add-ons"
              />
            </FormGroup>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default EditRole;
