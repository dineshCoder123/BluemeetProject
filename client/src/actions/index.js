import eureka from "../apis/eureka";
import { authActions } from "../reducers/authSlice";
import { eventActions } from "../reducers/eventSlice";
import { navigationActions } from "../reducers/navigationSlice";
import { communityActions } from "../reducers/communitySlice";
import { ticketActions } from "../reducers/ticketSlice";
import { sessionActions } from "../reducers/sessionSlice";
import { speakerActions } from "../reducers/speakerSlice";
import { sponsorActions } from "../reducers/sponsorSlice";
import { boothActions } from "../reducers/boothSlice";
import { userActions } from "../reducers/userSlice";
import history from "../history";

import { googleAuthActions } from "../reducers/googleAuthSlice";
import { communityAuthActions } from "../reducers/communityAuthSlice";
import { networkingActions } from "../reducers/networkingSlice";
import { couponActions } from "../reducers/couponSlice";
import { queriesActions } from "../reducers/queriesSlice";
import { registrationActions } from "../reducers/registrationSlice";
import { eventAccessActions } from "../reducers/eventAccessSlice";
import { socketActions } from "../reducers/socketSlice";
import { roomsActions } from "../reducers/roomsSlice";
import { RTMActions } from "../reducers/RTMSlice";
import AgoraRTM from "agora-rtm-sdk";
import { eventChatActions } from "../reducers/eventChatSlice";
import { RTCActions } from "../reducers/RTCSlice";
import { demoActions } from "../reducers/demoSlice";
import { contactUsActions } from "../reducers/contactSlice";
import { affiliateActions } from "../reducers/affiliateSlice";
import { interestedPeopleActions } from "../reducers/interestedPeopleSlice";
import { sessionChatActions } from "../reducers/sessionChatSlice";

import { eventAlertActions } from "../reducers/eventAlertSlice";
import { eventPollActions } from "../reducers/eventPollSlice";
import { availableForNetworkingActions } from "../reducers/availableForNetworking";

import socket from "../components/HostingPlatform/service/socket";
import { paypalActions } from "../reducers/paypalSlice";
import { tawkActions } from "../reducers/tawkSlice";
import { eventbriteActions } from "../reducers/eventbriteSlice";
import { apiKeyActions } from "../reducers/apiKeySlice";
import { snackbarActions } from "../reducers/snackbarSlice";
import { roleActions } from "../reducers/roleSlice";
import { sessionRestrictionActions } from "../reducers/sessionRestrictionSlice";
import { videoActions } from "./../reducers/videoSlice";
import { eventVideoActions } from "./../reducers/eventVideoSlice";
import { vibeActions } from "../reducers/vibeSlice";
import { StreamDestinationActions } from "../reducers/streamDestinationSlice";
import { mailActions } from "../reducers/mailSlice";
import { personalChatActions } from "../reducers/personalChatSlice";
import { teamInvitationActions } from "./../reducers/teamInvitationSlice";
import { magicLinkActions } from "./../reducers/magicLinkSlice";
import { eventTablesActions } from "./../reducers/eventTablesSlice";
import { boothTablesActions } from "./../reducers/boothTablesSlice";
import { StreamingActions } from "./../reducers/streamingSlice";
import { notificationActions } from "../reducers/notificationSlice";
import { SelectedTabActions } from "../reducers/selectedTabSlice";
import { connectionsActions } from "../reducers/connectionsSlice";
import { scheduledMeetActions } from "../reducers/scheduledMeetSlice";
import { sessionQnAActions } from "../reducers/sessionQnASlice";
import { sessionPollActions } from "./../reducers/sessionPollSlice";
import { openCloseActions } from "../reducers/openCloseSlice";
import { communityPageActions } from "./../reducers/communityPageSlice";
import { reviewActions } from "./../reducers/reviewSlice";
import { recordingActions } from "./../reducers/recordingSlice";
import { boothChairsActions } from "../reducers/boothChairsSlice";

const AWS = require("aws-sdk");
const UUID = require("uuid/v1");

const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: "us-west-1",
  accessKeyId: "AKIA4IKLDA4AOO7PPOCJ",
  secretAccessKey: "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",
});

const { REACT_APP_MY_ENV } = process.env;
const BaseURL = REACT_APP_MY_ENV
  ? "http://localhost:3000/api-eureka/eureka/v1/"
  : "https://api.bluemeet.in/api-eureka/eureka/v1/";

function uploadS3(url, file, progressCallback) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      }
    };

    if (progressCallback) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          var percentComplete = (e.loaded / file.size) * 100;
          progressCallback(percentComplete);
        }
      };
    }

    xhr.open("PUT", url);
    xhr.send(file);
  });
}

export const closeSnackbar = () => async (dispatch, getState) => {
  dispatch(snackbarActions.closeSnackBar());
};

export const showSnackbar =
  (severity, message) => async (dispatch, getState) => {
    dispatch(
      snackbarActions.openSnackBar({
        message: message,
        severity: severity,
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  };

export const showNotification = (message) => async (dispatch, getState) => {
  dispatch(
    notificationActions.setNotification({
      message: message,
    })
  );
};

export const signInForSpeaker =
  (id, communityId, eventId) => async (dispatch) => {
    console.log(id);

    try {
      const res = await eureka.post(`/eureka/v1/speakers/signin/${id}`);
      console.log(res);

      dispatch(
        authActions.SignIn({
          token: res.data.token,
        })
      );
      history.push(
        `/compatibility-test/community/${communityId}/event/${eventId}/`
      );
    } catch (err) {
      dispatch(authActions.hasError(err.response.data.message));
      console.log(err);
    }
  };

export const signIn = (res, intent, eventId) => async (dispatch) => {
  try {
    dispatch(
      authActions.SignIn({
        token: res.token,
        referralCode: res.data.user.hasUsedAnyReferral
          ? null
          : res.data.user.referralCode,
      })
    );
    dispatch(
      userActions.CreateUser({
        user: res.data.user,
      })
    );

    setTimeout(function () {
      dispatch(authActions.disabledSignInSucceded());
    }, 4000);

    if (intent === "eventRegistration") {
      history.push(`/event-landing-page/${eventId}`);
    } else if (intent === "buyPlan") {
      history.push("/pricing");
      dispatch(fetchUserAllPersonalData());
    } else {
      history.push("/user/home");
    }
  } catch (err) {
    // dispatch(authActions.hasError(err.response.data.message));
    // console.log(err.response);
    console.log(err);
  }
};
export const errorTrackerForSignIn = () => async (dispatch, getState) => {
  dispatch(authActions.disabledError());
};

export const fetchReferralCode =
  (referredUserId) => async (dispatch, getState) => {
    dispatch(userActions.FetchReferralCode({ referredUserId }));
  };

export const createUserAccountRequest =
  (formValues, intent, eventId, setSignupClicked, referralCode) =>
  async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}createUserAccountRequest`,

        {
          method: "POST",

          body: JSON.stringify({
            ...formValues,
            intent: intent,
            eventId: eventId,
            referralCode: referralCode,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Failed to verify community. Please try again.");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      if (res.alreadyUsedEmail) {
        dispatch(
          showSnackbar(
            "error",
            "This email is already in use. Please sign up using another email."
          )
        );

        setSignupClicked(false);
      } else {
        dispatch(
          userActions.SetUserVerificationEmail({
            email: res.email,
          })
        );

        history.push(`/verify-account/${res.id}`);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to create account. Please try again.")
      );
      setSignupClicked(false);
    }
  };

export const verifyUserEmailAndSignup = (id) => async (dispatch, getState) => {
  try {
    let res = await fetch(
      `${BaseURL}users/verifyUserEmailAndSignup/${id}`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Failed to verify community. Please try again.");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    if (res.expired) {
      // Link has expired
      dispatch(
        userActions.SetUserVerificationLinkExpired({
          userVerificationLinkStatus: true,
        })
      );
    } else {
      dispatch(
        authActions.SignIn({
          token: res.token,
          referralCode: res.referralCode,
        })
      );
      dispatch(
        userActions.CreateUser({
          user: res.user,
        })
      );

      if (res.intent === "eventRegistration") {
        history.push(`/event-landing-page/${res.eventId}`);
      } else if (res.intent === "buyPlan") {
        history.push("/pricing");
        dispatch(fetchUserAllPersonalData());
      } else {
        history.push("/user/home");
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar(
        "error",
        "Failed to verify user identity. Please try to sign in."
      )
    );
  }
};

export const signUp = (formValues, intent, eventId) => async (dispatch) => {
  try {
    const res = await eureka.post("/eureka/v1/users/signup", {
      ...formValues,
    });

    dispatch(
      authActions.SignIn({
        token: res.data.token,
        referralCode: res.data.data.user.referralCode,
      })
    );
    dispatch(
      userActions.CreateUser({
        user: res.data.data.user,
      })
    );

    if (intent === "eventRegistration") {
      history.push(`/event-landing-page/${eventId}`);
    } else if (intent === "buyPlan") {
      history.push("/pricing");
      dispatch(fetchUserAllPersonalData());
    } else {
      history.push("/user/home");
    }
  } catch (err) {
    dispatch(authActions.hasError(err.response.data.message));
    alert(err.response.data.message);
  }
};

export const errorTrackerForSignUp = () => async (dispatch, getState) => {
  dispatch(authActions.disabledError());
};
export const linkedinSignIn =
  (code, intent, eventId) => async (dispatch, getState) => {
    try {
      const res = await eureka.get(`/getUserCredentials/?code=${code}`);
      console.log(res.data);
      const result = res.data.userProfile;

      result.referralCode = getState().user.referralCode;
      socket.emit("linkedinSignIn", { result });
    } catch (err) {
      console.log(err);
    }
  };

export const newLinkedinLogin = (res, intent, eventId) => async (dispatch) => {
  console.log(res.data.user);
  dispatch(
    authActions.SignIn({
      token: res.token,
      isSignedInThroughLinkedin: true,

      referralCode: res.data.user.hasUsedAnyReferral
        ? null
        : res.data.user.referralCode,
    })
  );
  dispatch(
    userActions.CreateUser({
      user: res.data.user,
    })
  );

  setTimeout(function () {
    dispatch(authActions.disabledSignInSucceded());
  }, 4000);

  if (intent === "eventRegistration") {
    history.push(`/event-landing-page/${eventId}`);
  } else if (intent === "buyPlan") {
    history.push("/pricing");
    dispatch(fetchUserAllPersonalData());
  } else {
    history.push("/user/home");
  }
};

export const errorTrackerForLinkedinSignIn =
  () => async (dispatch, getState) => {
    dispatch(authActions.disabledError());
  };
export const googleSignIn = (res, intent, eventId) => async (dispatch) => {
  try {
    dispatch(
      authActions.SignIn({
        token: res.token,
        isSignedInThroughGoogle: true,

        referralCode: res.data.user.hasUsedAnyReferral
          ? null
          : res.data.user.referralCode,
      })
    );
    dispatch(
      userActions.CreateUser({
        user: res.data.user,
      })
    );

    setTimeout(function () {
      dispatch(authActions.disabledSignInSucceded());
    }, 4000);

    if (intent === "eventRegistration") {
      history.push(`/event-landing-page/${eventId}`);
    } else if (intent === "buyPlan") {
      history.push("/pricing");
      dispatch(fetchUserAllPersonalData());
    } else {
      history.push("/user/home");
    }
  } catch (err) {
    console.log(err);
  }
};

export const errorTrackerForGoogleSignIn = () => async (dispatch, getState) => {
  dispatch(authActions.disabledError());
};

export const signOut = () => async (dispatch, getState) => {
  socket.emit("logOut", { userId: getState().user.userDetails._id });
  window.localStorage.clear();

  window.gapi.load("client:auth2", () => {
    window.gapi.client
      .init({
        clientId:
          "438235916836-6oaj1fbnqqrcd9ba30348fbe2ebn6lt0.apps.googleusercontent.com",
        scope: "profile email",
      })
      .then(() => {
        window.gapi.auth2.getAuthInstance().signOut();
      });
  });

  dispatch(authActions.SignOut());
  dispatch(communityAuthActions.CommunitySignOut());

  setTimeout(function () {
    dispatch(authActions.disabledSignOutSucceded());
  }, 4000);

  history.push("/home");

  //TODO Home page
};

export const createCommunityRequest =
  (formValues, file, userId, handleClose) => async (dispatch, getState) => {
    console.log(formValues);

    const key = `${userId}/${UUID()}.jpeg`;

    try {
      if (file) {
        console.log(file);

        const communityCreating = async () => {
          let res = await fetch(
            `${BaseURL}users/newCommunityRequest`,

            {
              method: "POST",
              body: JSON.stringify({
                ...formValues,
                image: key,
              }),

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
              },
            }
          );
          if (!res.ok) {
            if (!res.message) {
              throw new Error("Creating community failed");
            } else {
              throw new Error(res.message);
            }
          }
          res = await res.json();
          return res;
        };

        s3.getSignedUrl(
          "putObject",
          {
            Bucket: "bluemeet-inc",
            Key: key,
            ContentType: "image/jpeg",
          },
          async (err, presignedURL) => {
            const awsRes = await fetch(presignedURL, {
              method: "PUT",

              body: file,

              headers: {
                "Content-Type": file.type,
              },
            });

            console.log(awsRes);

            try {
              let res = await communityCreating();

              if (res.alreadyUsedEmail) {
                dispatch(
                  showSnackbar(
                    "error",
                    "This email is registered on another community."
                  )
                );
              } else {
                handleClose();

                dispatch(
                  showSnackbar("success", "Community created successfully!")
                );

                dispatch(
                  communityActions.CreateCommunityRequest({
                    community: res.data,
                  })
                );
                dispatch(
                  userActions.SetCommunityVerificationEmail({
                    email: res.email,
                  })
                );
                dispatch(
                  userActions.SetCommunityVerificationOpenState({
                    openState: true,
                  })
                );
              }
            } catch (e) {
              dispatch(communityActions.hasError(e.message));
            }
          }
        );
      } else {
        const communityCreating = async () => {
          let res = await fetch(`${BaseURL}users/newCommunityRequest`, {
            method: "POST",
            body: JSON.stringify({
              ...formValues,
            }),

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getState().auth.token}`,
            },
          });

          if (!res.ok) {
            if (!res.message) {
              throw new Error("creating community failed");
            } else {
              throw new Error(res.message);
            }
          }

          res = await res.json();
          return res;
        };
        // console.log(res);
        try {
          let res = await communityCreating();

          if (res.alreadyUsedEmail) {
            dispatch(
              showSnackbar(
                "error",
                "This email is already used by another community."
              )
            );
          } else {
            handleClose();

            dispatch(
              communityActions.CreateCommunityRequest({
                community: res.data,
              })
            );
            dispatch(
              userActions.SetCommunityVerificationEmail({
                email: res.email,
              })
            );
            dispatch(
              userActions.SetCommunityVerificationId({
                id: res.data._id,
              })
            );
            dispatch(
              userActions.SetCommunityVerificationOpenState({
                openState: true,
              })
            );
          }
        } catch (e) {
          dispatch(communityActions.hasError(e.message));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
export const errorTrackerForCreateCommunity =
  () => async (dispatch, getState) => {
    dispatch(communityActions.disabledError());
  };

export const communitySignIn = (id, userId) => async (dispatch, getState) => {
  dispatch(communityAuthActions.startLoading());

  const loginCommunity = async () => {
    let res = await fetch(
      `${BaseURL}users/${id}`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Signing in the community failed");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    return res;
  };
  try {
    let res = await loginCommunity();
    console.log(res);

    dispatch(
      communityAuthActions.CommunitySignIn({
        token: res.token,
      })
    );

    window.location.href = `/user/${userId}/community/getting-started/${res.communityDoc.id}`;
  } catch (e) {
    dispatch(communityActions.hasError(e.message));
  }
};

export const errorTrackerForCommunitySignIn =
  () => async (dispatch, getState) => {
    dispatch(communityActions.disabledError());
  };

export const googleSignOut = () => async (dispatch, getState) => {
  dispatch(authActions.SignOut());
};

//events actions
export const fetchEvents = (query) => async (dispatch) => {
  console.log(query);
  dispatch(eventActions.startLoading());

  try {
    const res = await eureka.get(`/eureka/v1/exploreEvents${query}`);
    console.log(res.data);
    // console.log(res.data.data.events);
    dispatch(
      eventActions.FetchEvents({
        events: res.data.data.events,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(eventActions.hasError(e.message));
  }
};

export const errorTrackerForFetchEvents = () => async (dispatch, getState) => {
  dispatch(eventActions.disabledError());
};

export const fetchUserAllPersonalData = () => async (dispatch, getState) => {
  dispatch(communityActions.startCommunityLoading());
  const fetchData = async () => {
    let res = await fetch(
      `${BaseURL}users/personalData`,

      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );

    console.log(res);
    if (!res.ok) {
      if (!res.message) {
        throw new Error("fetching user data failed");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    return res;
  };
  try {
    const res = await fetchData();

    let allCommuities = [];

    for (let element of res.data.personalData.communities) {
      allCommuities.push(element);
    }

    for (let item of res.data.personalData.invitedCommunities) {
      allCommuities.push(item);
    }

    dispatch(
      eventActions.FetchEvents({
        events: res.data.personalData.registeredInEvents,
      })
    );
    dispatch(
      communityActions.FetchCommunities({
        communities: allCommuities,
      })
    );

    dispatch(
      communityActions.FetchCommunityRequests({
        communityRequests: res.communityRequests,
      })
    );

    dispatch(
      userActions.CreateUser({
        user: res.data.personalData,
      })
    );
  } catch (e) {
    dispatch(eventActions.hasError(e.message));
  }
};
export const errorTrackerForPersonalData = () => async (dispatch, getState) => {
  dispatch(eventActions.disabledError());
};

export const fetchUserRegisteredEvents = () => async (dispatch, getState) => {
  dispatch(eventActions.startLoading());
  const fetchData = async () => {
    let res = await fetch(
      `${BaseURL}users/registeredEvents`,

      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );

    if (!res.ok) {
      if (!res.message) {
        throw new Error("fetching user registrations failed");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res, "These are events in which user has registered!");
    return res;
  };

  try {
    const res = await fetchData();
    console.log(res);

    dispatch(
      eventActions.FetchEvents({
        events: res.data.registeredInEventsList.registeredInEvents,
      })
    );
  } catch (err) {
    dispatch(eventActions.hasError(err.message));
  }
};

export const errorTrackerForRegisteredEvents =
  () => async (dispatch, getState) => {
    dispatch(eventActions.disabledError());
  };

export const fetchMyPopulatedFavouriteEvents =
  () => async (dispatch, getState) => {
    dispatch(eventActions.startLoading());

    const fetchData = async () => {
      let res = await fetch(
        `${BaseURL}users/myPopulatedFavouriteEvents`,

        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );
      console.log(res);

      if (!res.ok) {
        if (!res.message) {
          throw new Error("fetching user favourite events failed");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      return res;
    };

    try {
      const res = await fetchData();
      console.log(res);

      dispatch(
        eventActions.FetchPopulatedFavouriteEvents({
          events: res.data.favouriteEvents,
        })
      );
    } catch (error) {
      dispatch(eventActions.hasError(error.message));
      dispatch(
        showSnackbar("error", "Failed to fetch wishlist, Please try again.")
      );
    }
  };

export const fetchMyFavouriteEvents = () => async (dispatch, getState) => {
  dispatch(eventActions.startLoading());

  const fetchData = async () => {
    let res = await fetch(
      `${BaseURL}users/myFavouriteEvents`,

      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );
    console.log(res);

    if (!res.ok) {
      if (!res.message) {
        throw new Error("fetching user favourite events failed");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    return res;
  };

  try {
    const res = await fetchData();
    console.log(res);

    dispatch(
      eventActions.FetchFavouriteEvents({
        events: res.data.favouriteEvents,
      })
    );
  } catch (error) {
    dispatch(eventActions.hasError(error.message));
    dispatch(
      showSnackbar("error", "Failed to fetch wishlist, Please try again.")
    );
  }
};

export const addToFavouriteEvents = (eventId) => async (dispatch, getState) => {
  dispatch(eventActions.startLoading());

  const addTofavourites = async () => {
    let res = await fetch(
      `${BaseURL}users/addToFavouriteEvents/${eventId}`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );
    console.log(res);

    if (!res.ok) {
      if (!res.message) {
        throw new Error("adding to user favourite events list failed");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    return res;
  };

  try {
    const res = await addTofavourites();
    console.log(res);

    dispatch(
      eventActions.AddToFavouriteEvents({
        event: res.data,
        eventDoc: res.eventDoc,
      })
    );

    dispatch(
      userActions.CreateUser({
        user: res.userDoc,
      })
    );

    dispatch(showSnackbar("success", "Added to wishlist."));
  } catch (error) {
    dispatch(eventActions.hasError(error.message));
    dispatch(
      showSnackbar("success", "Failed to add to wishlist, Please try again.")
    );
  }
};

export const removeFromFavouriteEvents =
  (eventId) => async (dispatch, getState) => {
    dispatch(eventActions.startLoading());

    const removeFromFavourites = async () => {
      let res = await fetch(
        `${BaseURL}users/removeFromFavouriteEvents/${eventId}`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("removing from favourite events list failed");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      return res;
    };

    try {
      const res = await removeFromFavourites();

      console.log(res);

      dispatch(
        eventActions.RemoveFromFavouriteEvents({
          eventId: res.data,
          eventDoc: res.eventDoc,
        })
      );

      dispatch(
        userActions.CreateUser({
          user: res.userDoc,
        })
      );

      dispatch(showSnackbar("success", "Removed from wishlist."));
    } catch (error) {
      dispatch(eventActions.hasError(error.message));
      dispatch(
        showSnackbar(
          "error",
          "Failed to remove from wishlist, Please try again."
        )
      );
    }
  };

export const fetchEventLandingPage =
  (id, countAsView) => async (dispatch, getState) => {
    dispatch(eventActions.startLoading());

    try {
      const res = await fetch(
        `${BaseURL}users/event/${id}`,

        {
          method: "POST",
          body: JSON.stringify({
            countAsView,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Unable to load event. Please try again.");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      dispatch(
        eventActions.FetchEvent({
          event: result.data,
        })
      );

      dispatch(
        ticketActions.FetchTickets({
          tickets: result.tickets,
        })
      );
    } catch (error) {
      dispatch(
        showSnackbar("error", "Unable to load event. Please try again.")
      );
      dispatch(eventActions.hasError(error));
      console.log(error);
    }
  };

export const fetchEvent = (id) => async (dispatch, getState) => {
  dispatch(eventActions.startLoading());

  try {
    const res = await eureka.get(`eureka/v1/users/event/${id}`);
    console.log(res.data);
    dispatch(
      eventActions.FetchEvent({
        event: res.data.data.response,
      })
    );
  } catch (err) {
    dispatch(eventActions.hasError(err.message));
    console.log(err.response.data);
  }
};
export const errorTrackerForFetchEvent = () => async (dispatch, getState) => {
  dispatch(eventActions.disabledError());
};
export const fetchParticularEventOfCommunity =
  (id) => async (dispatch, getState) => {
    dispatch(eventActions.startLoading());
    try {
      const res = await fetch(
        `${BaseURL}community/events/${id}`,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      console.log(result);

      dispatch(
        eventActions.FetchEvent({
          event: result.data.event,
        })
      );
    } catch (err) {
      dispatch(eventActions.hasError(err.message));
      console.log(err);
    }
  };

export const errorTrackerForFetchParticularEventOfCommunity =
  () => async (dispatch, getState) => {
    dispatch(eventActions.disabledError());
  };
export const fetchEventsOfParticularCommunity =
  (term, page, limit) => async (dispatch, getState) => {
    dispatch(eventActions.startLoading());

    const fetchEvents = async () => {
      let fullLocation = `${BaseURL}community/events`;
      let url = new URL(fullLocation);
      let search_params = url.searchParams;

      if (term) {
        search_params.set("text", term);
      }
      if (page) {
        search_params.set("page", page);
      }
      if (limit) {
        search_params.set("limit", limit);
      }

      url.search = search_params.toString();
      let new_url = url.toString();

      console.log(new_url);

      const communityEvents = await fetch(new_url, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });
      if (!communityEvents.ok) {
        if (!communityEvents.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(communityEvents.message);
        }
      }
      const eventsResult = await communityEvents.json();
      console.log(eventsResult);

      return eventsResult;
    };

    try {
      const eventsResult = await fetchEvents();

      dispatch(
        eventActions.FetchEvents({
          events: eventsResult.events,

          length: eventsResult.length,
        })
      );
      // );
    } catch (err) {
      dispatch(eventActions.hasError(err.message));
    }
  };

export const errorTrackerForFetchEventsOfParticularCommunity =
  () => async (dispatch, getState) => {
    dispatch(eventActions.disabledError());
  };

export const createEvent = (formValues) => async (dispatch, getState) => {
  dispatch(eventActions.startLoading());

  const creatingEvent = async () => {
    console.log(formValues);

    let res = await fetch(
      `${BaseURL}community/events/new`,

      {
        method: "POST",
        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      }
    );
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    return res;
  };

  try {
    const res = await creatingEvent();
    console.log(res);

    dispatch(
      eventActions.CreateEvent({
        event: res.data.event,
      })
    );

    dispatch(
      snackbarActions.openSnackBar({
        message: "New event created successfully!",
        severity: "success",
      })
    );

    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 4000);
  } catch (err) {
    console.log(err);
    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to created new event.",
        severity: "error",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 4000);
    dispatch(eventActions.hasError(err.message));
  }
};
export const errorTrackerForCreateEvent = () => async (dispatch, getState) => {
  dispatch(eventActions.disabledError());
};

export const editEvent =
  (formValues, id, unarchive) => async (dispatch, getState) => {
    dispatch(eventActions.startLoading());
    const editingEvent = async () => {
      console.log(id);
      console.log(formValues);

      let res = await fetch(
        `${BaseURL}events/${id}/update`,

        {
          method: "PATCH",
          body: JSON.stringify({
            ...formValues,
            unarchive: unarchive,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      return res;
    };
    try {
      const res = await editingEvent();
      console.log(res);

      if (unarchive) {
        dispatch(
          eventActions.UnarchiveEvent({
            eventId: id,
          })
        );
      }

      dispatch(
        eventActions.EditEvent({
          event: res.updatedEvent,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Event updated successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (err) {
      console.log(err);

      dispatch(eventActions.hasError(err.message));

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update event.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };
export const errorTrackerForeditEvent = () => async (dispatch, getState) => {
  dispatch(eventActions.disabledError());
};

export const updateEventCustomisation =
  (formValues, eventId) => async (dispatch, getState) => {
    dispatch(eventActions.startLoading());
    try {
      console.log(eventId);
      console.log(formValues);

      let res = await fetch(
        `${BaseURL}events/${eventId}/updateCustomisation`,

        {
          method: "PATCH",
          body: JSON.stringify({
            ...formValues,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res);

      dispatch(
        eventActions.EditEvent({
          event: res.eventDoc,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Customisation settings updated successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(eventActions.hasError(error.message));

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update event.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const uploadEventImage = (file, id) => async (dispatch, getState) => {
  dispatch(eventActions.startLoading());

  const key = `${id}/${UUID()}.jpeg`;

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "bluemeet-inc",
      Key: key,
      ContentType: "image/jpeg",
    },
    async (err, presignedURL) => {
      const awsRes = await fetch(presignedURL, {
        method: "PUT",

        body: file,

        headers: {
          "Content-Type": file.type,
        },
      });

      console.log(awsRes);

      if (awsRes.status === 200) {
        try {
          // Save this image info in event document.
          const res = await fetch(
            `${BaseURL}events/${id}/updatePromoImage`,

            {
              method: "PATCH",
              body: JSON.stringify({
                image: key,
              }),

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().communityAuth.token}`,
              },
            }
          );
          const result = await res.json();
          dispatch(
            eventActions.EditEvent({
              event: result.updatedEvent,
            })
          );

          dispatch(
            snackbarActions.openSnackBar({
              message: "Promo image updated!",
              severity: "success",
            })
          );

          setTimeout(function () {
            dispatch(snackbarActions.closeSnackBar());
          }, 6000);
        } catch (error) {
          eventActions.hasError(error.message);
          console.log(error);

          dispatch(
            snackbarActions.openSnackBar({
              message: "Failed to upload promo image.",
              severity: "error",
            })
          );
          setTimeout(function () {
            dispatch(snackbarActions.closeSnackBar());
          }, 4000);
        }
      }
    }
  );
};

export const errorTrackerForUploadEventImage =
  () => async (dispatch, getState) => {
    dispatch(eventActions.disabledError());
  };

export const editEventDescription =
  (formValues, id) => async (dispatch, getState) => {
    dispatch(eventActions.startLoading());
    const editingEvent = async () => {
      console.log(id);
      console.log(formValues);

      let res = await fetch(
        `${BaseURL}events/${id}/updateEventDescription`,

        {
          method: "PATCH",
          body: JSON.stringify({
            ...formValues,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      return res;
    };

    try {
      const res = await editingEvent();
      console.log(res);

      dispatch(
        eventActions.EditEvent({
          event: res.updatedEvent,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Event description updated!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    } catch (err) {
      dispatch(eventActions.hasError(err.message));
    }
  };

export const errorTrackerForEditEventDiscription =
  () => async (dispatch, getState) => {
    dispatch(eventActions.disabledError());
  };

export const deleteEvent = () => (dispatch, getState) => {
  // not implemented yet
};

//speaker actions
export const createSpeaker =
  (formValues, file, id) => async (dispatch, getState) => {
    dispatch(speakerActions.startLoadingDetail());
    try {
      if (file) {
        const key = `${id}/${UUID()}.jpeg`;

        s3.getSignedUrl(
          "putObject",
          {
            Bucket: "bluemeet-inc",
            Key: key,
            ContentType: "image/jpeg",
          },
          async (err, presignedURL) => {
            const awsRes = await fetch(presignedURL, {
              method: "PUT",

              body: file,

              headers: {
                "Content-Type": file.type,
              },
            });

            console.log(awsRes);

            if (awsRes.status === 200) {
              try {
                let res = await fetch(
                  `${BaseURL}events/${id}/addSpeaker`,

                  {
                    method: "POST",
                    body: JSON.stringify({
                      ...formValues,
                      image: key,
                    }),

                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${getState().communityAuth.token}`,
                    },
                  }
                );
                if (!res.ok) {
                  if (!res.message) {
                    throw new Error("Something went wrong");
                  } else {
                    throw new Error(res.message);
                  }
                }
                res = await res.json();
                console.log(res);

                dispatch(
                  speakerActions.CreateSpeaker({
                    speaker: res.data,
                  })
                );

                dispatch(
                  snackbarActions.openSnackBar({
                    message: "Speaker added successfully!",
                    severity: "success",
                  })
                );

                setTimeout(function () {
                  dispatch(snackbarActions.closeSnackBar());
                }, 6000);
              } catch (error) {
                console.log(error);

                dispatch(
                  snackbarActions.openSnackBar({
                    message: "Failed to add speaker. Please try again",
                    severity: "error",
                  })
                );
                setTimeout(function () {
                  dispatch(snackbarActions.closeSnackBar());
                }, 4000);
              }
            }
          }
        );
      } else {
        console.log(id);
        console.log(formValues);

        let res = await fetch(
          `${BaseURL}events/${id}/addSpeaker`,

          {
            method: "POST",
            body: JSON.stringify({
              ...formValues,
            }),

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getState().communityAuth.token}`,
            },
          }
        );
        console.log(res);

        res = await res.json();
        console.log(res);

        dispatch(
          speakerActions.CreateSpeaker({
            speaker: res.data,
          })
        );

        dispatch(
          snackbarActions.openSnackBar({
            message: "Speaker added successfully!",
            severity: "success",
          })
        );

        setTimeout(function () {
          dispatch(snackbarActions.closeSnackBar());
        }, 6000);
      }
    } catch (err) {
      dispatch(speakerActions.detailHasError(err.message));
      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to add speaker. Please try again",
          severity: "error",
        })
      );
      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 4000);
    }
  };
export const errorTrackerForCreateSpeaker =
  () => async (dispatch, getState) => {
    dispatch(speakerActions.disabledDetailError());
  };

export const fetchSpeakers =
  (id, term, sessionId) => async (dispatch, getState) => {
    dispatch(speakerActions.startLoading());

    const getSpeakers = async () => {
      let fullLocation = `${BaseURL}events/${id}/speakers`;
      let url = new URL(fullLocation);
      let search_params = url.searchParams;

      if (term) {
        search_params.set("text", term);
      }
      if (sessionId && sessionId !== "all") {
        search_params.set("sessionId", sessionId);
      }
      url.search = search_params.toString();
      let new_url = url.toString();

      console.log(new_url);

      let res = await fetch(new_url, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      console.log(res);
      return res;
    };
    try {
      const res = await getSpeakers();
      dispatch(
        speakerActions.FetchSpeakers({
          speakers: res.data.speakers,
        })
      );
    } catch (err) {
      dispatch(speakerActions.hasError(err.message));
      console.log(err);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Fetching speakers failed. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };
export const errorTrackerForFetchSpeakers =
  () => async (dispatch, getState) => {
    dispatch(speakerActions.disabledError());
  };

export const fetchParticularSpeakerOfEvent =
  (id) => async (dispatch, getState) => {
    dispatch(speakerActions.startLoadingDetail());

    const fetchingSpeaker = async () => {
      const res = await fetch(
        `${BaseURL}speakers/${id}`,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();
      return result;
    };
    try {
      const result = await fetchingSpeaker();

      console.log(result);

      dispatch(
        speakerActions.FetchSpeaker({
          speaker: result.data.speaker,
        })
      );
    } catch (err) {
      dispatch(speakerActions.detailHasError(err.message));
      console.log(err);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Fetching speaker failed. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const errorTrackerForFetchParticularSpeakerOfEvent =
  () => async (dispatch, getState) => {
    dispatch(speakerActions.disabledDetailError());
  };

export const fetchSpeaker = (id) => async (dispatch, getState) => {
  dispatch(speakerActions.startLoading());

  const fetchingSpeaker = async () => {
    //console.log(id, "I am passing from particularEvent action");

    const res = await fetch(
      `${BaseURL}speakers/${id}/getSpeaker`,

      {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      }
    );

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    const result = await res.json();

    return result;
  };
  try {
    const result = await fetchingSpeaker();
    console.log(result);

    dispatch(
      speakerActions.FetchSpeaker({
        speaker: result.data.speaker,
      })
    );
    dispatch(
      userActions.CreateUser({
        user: result.data.speaker,
      })
    );
  } catch (err) {
    console.log(err);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Fetching speaker failed. Please try again later.",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);

    dispatch(speakerActions.hasError(err.message));
  }
};

export const errorTrackerForFetchSpeaker = () => async (dispatch, getState) => {
  dispatch(speakerActions.disabledError());
};

export const editSpeaker =
  (formValues, file, id) => async (dispatch, getState) => {
    dispatch(speakerActions.startLoadingDetail());

    try {
      if (file) {
        const key = `${id}/${UUID()}.jpeg`;

        s3.getSignedUrl(
          "putObject",
          {
            Bucket: "bluemeet-inc",
            Key: key,
            ContentType: "image/jpeg",
          },

          async (err, presignedURL) => {
            const awsRes = await fetch(presignedURL, {
              method: "PUT",

              body: file,

              headers: {
                "Content-Type": file.type,
              },
            });

            console.log(awsRes);

            if (awsRes.status === 200) {
              try {
                let res = await fetch(
                  `${BaseURL}speakers/${id}/update`,

                  {
                    method: "PATCH",
                    body: JSON.stringify({
                      ...formValues,
                      image: key,
                    }),

                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${getState().communityAuth.token}`,
                    },
                  }
                );
                if (!res.ok) {
                  if (!res.message) {
                    throw new Error("Something went wrong");
                  } else {
                    throw new Error(res.message);
                  }
                }

                res = await res.json();
                console.log(res);

                dispatch(
                  speakerActions.EditSpeaker({
                    speaker: res.data.updatedSpeaker,
                  })
                );

                dispatch(
                  snackbarActions.openSnackBar({
                    message: "Speaker updated successfully!",
                    severity: "success",
                  })
                );

                setTimeout(function () {
                  dispatch(snackbarActions.closeSnackBar());
                }, 6000);
              } catch (error) {
                console.log(error);

                dispatch(
                  snackbarActions.openSnackBar({
                    message: "Failed to update speaker. Please try again",
                    severity: "error",
                  })
                );
                setTimeout(function () {
                  dispatch(snackbarActions.closeSnackBar());
                }, 4000);
              }
            } else {
              dispatch(
                snackbarActions.openSnackBar({
                  message: "Failed to update speaker. Please try again",
                  severity: "error",
                })
              );
              setTimeout(function () {
                dispatch(snackbarActions.closeSnackBar());
              }, 4000);
            }
          }
        );
      } else {
        let res = await fetch(
          `${BaseURL}speakers/${id}/update`,

          {
            method: "PATCH",
            body: JSON.stringify({
              ...formValues,
            }),

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getState().communityAuth.token}`,
            },
          }
        );

        if (!res.ok) {
          if (!res.message) {
            throw new Error("Something went wrong");
          } else {
            throw new Error(res.message);
          }
        }

        res = await res.json();
        console.log(res);

        dispatch(
          speakerActions.EditSpeaker({
            speaker: res.data.updatedSpeaker,
          })
        );

        dispatch(
          snackbarActions.openSnackBar({
            message: "Speaker updated successfully!",
            severity: "success",
          })
        );
        setTimeout(function () {
          dispatch(snackbarActions.closeSnackBar());
        }, 4000);
      }
    } catch (err) {
      dispatch(speakerActions.detailHasError(err.message));
      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update speaker. Please try again",
          severity: "error",
        })
      );
      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 4000);
    }
  };
export const errorTrackerForEditSpeaker = () => async (dispatch, getState) => {
  dispatch(speakerActions.disabledDetailError());
};

export const deleteSpeaker = (id) => async (dispatch, getState) => {
  dispatch(speakerActions.startLoading());
  const deletingSpeaker = async () => {
    let res = await fetch(`${BaseURL}speakers/${id}/delete`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    return res;
  };

  try {
    const res = await deletingSpeaker();
    console.log(res);

    dispatch(
      speakerActions.DeleteSpeaker({
        id: res.id,
      })
    );

    dispatch(
      snackbarActions.openSnackBar({
        message: "Speaker deleted successfully!",
        severity: "success",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 4000);
  } catch (err) {
    console.log(err);
    dispatch(speakerActions.hasError(err.message));

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to delte speaker. Please try again",
        severity: "error",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 4000);
  }
};

export const errorTrackerForDeletingSpeaker =
  () => async (dispatch, getState) => {
    dispatch(speakerActions.disabledError());
  };
// booths  actions

export const createBooth =
  (formValues, file, id, handleClose) => async (dispatch, getState) => {
    dispatch(boothActions.startLoading());

    try {
      if (file) {
        const key = `${id}/${UUID()}.jpeg`;

        s3.getSignedUrl(
          "putObject",
          {
            Bucket: "bluemeet-inc",
            Key: key,
            ContentType: "image/jpeg",
          },

          async (err, presignedURL) => {
            const awsRes = await fetch(presignedURL, {
              method: "PUT",

              body: file,

              headers: {
                "Content-Type": file.type,
              },
            });

            console.log(awsRes);

            if (awsRes.status === 200) {
              try {
                let res = await fetch(
                  `${BaseURL}booths/${id}/addBooth`,

                  {
                    method: "POST",
                    body: JSON.stringify({
                      ...formValues,
                      image: key,
                    }),

                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${getState().communityAuth.token}`,
                    },
                  }
                );
                if (!res.ok) {
                  if (!res.message) {
                    throw new Error("Something went wrong");
                  } else {
                    throw new Error(res.message);
                  }
                }
                res = await res.json();
                console.log(res);

                handleClose();

                dispatch(
                  boothActions.CreateBooth({
                    booth: res.data,
                  })
                );

                dispatch(
                  snackbarActions.openSnackBar({
                    message: "Added booth successfully!",
                    severity: "success",
                  })
                );

                setTimeout(function () {
                  dispatch(snackbarActions.closeSnackBar());
                }, 6000);
              } catch (error) {
                eventActions.hasError(error.message);
                console.log(error);
                handleClose();

                dispatch(
                  snackbarActions.openSnackBar({
                    message: "Failed to add booth. Please try again later!",
                    severity: "error",
                  })
                );
                setTimeout(function () {
                  dispatch(snackbarActions.closeSnackBar());
                }, 4000);
              }
            }
          }
        );
      } else {
        let res = await fetch(
          `${BaseURL}booths/${id}/addBooth`,

          {
            method: "POST",
            body: JSON.stringify({
              ...formValues,
            }),

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getState().communityAuth.token}`,
            },
          }
        );
        if (!res.ok) {
          if (!res.message) {
            throw new Error("Something went wrong");
          } else {
            throw new Error(res.message);
          }
        }
        res = await res.json();
        console.log(res);

        handleClose();

        dispatch(
          boothActions.CreateBooth({
            booth: res.data,
          })
        );
        dispatch(
          snackbarActions.openSnackBar({
            message: "Added booth successfully!",
            severity: "success",
          })
        );

        setTimeout(function () {
          dispatch(snackbarActions.closeSnackBar());
        }, 6000);
      }
    } catch (err) {
      dispatch(boothActions.hasError(err.message));
      handleClose();
      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to add booth. Please try again later!",
          severity: "error",
        })
      );
      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 4000);
    }
  };
export const errorTrackerForCreateBooth = () => async (dispatch, getState) => {
  dispatch(boothActions.disabledError());
};

export const fetchBooths = (id, term, tag) => async (dispatch, getState) => {
  dispatch(boothActions.startLoading());
  const getBooths = async () => {
    console.log(id);

    let fullLocation = `${BaseURL}booths/${id}/getAllbooths`;
    let url = new URL(fullLocation);
    let search_params = url.searchParams;

    if (term) {
      search_params.set("text", term);
    }
    if (tag && tag !== "all") {
      search_params.set("tag", tag);
    }
    url.search = search_params.toString();
    let new_url = url.toString();

    console.log(new_url);

    let res = await fetch(new_url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);
    return res;
  };

  try {
    const res = await getBooths();

    dispatch(
      boothActions.FetchBooths({
        booths: res.data,
      })
    );
  } catch (err) {
    dispatch(boothActions.hasError(err.message));
    console.log(err);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch booths. Please try again later!",
        severity: "error",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 4000);
  }
};

export const errorTrackerForFetchBooths = () => async (dispatch, getState) => {
  dispatch(boothActions.disabledError());
};

export const fetchBooth = (id) => async (dispatch, getState) => {
  try {
    console.log(id);

    let res = await fetch(`${BaseURL}booths/${id}/getBoothDetails`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    dispatch(
      boothActions.FetchBooth({
        booth: res.data,
      })
    );
  } catch (err) {
    dispatch(boothActions.hasError(err.message));
    console.log(err);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch booth. Please try again later!",
        severity: "error",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 4000);
  }
};

export const errorTrackerForFetchBooth = () => async (dispatch, getState) => {
  dispatch(boothActions.disabledError());
};

export const editBooth =
  (formValues, file, id) => async (dispatch, getState) => {
    try {
      if (file) {
        const key = `${id}/${UUID()}.jpeg`;

        s3.getSignedUrl(
          "putObject",
          {
            Bucket: "bluemeet-inc",
            Key: key,
            ContentType: "image/jpeg",
          },

          async (err, presignedURL) => {
            const awsRes = await fetch(presignedURL, {
              method: "PUT",

              body: file,

              headers: {
                "Content-Type": file.type,
              },
            });

            console.log(awsRes);

            if (awsRes.status === 200) {
              try {
                let res = await fetch(`${BaseURL}booths/${id}/updateBooth`, {
                  method: "PATCH",
                  body: JSON.stringify({
                    ...formValues,
                    image: key,
                  }),

                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().auth.token}`,
                  },
                });
                if (!res.ok) {
                  if (!res.message) {
                    throw new Error("Something went wrong");
                  } else {
                    throw new Error(res.message);
                  }
                }
                res = await res.json();
                console.log(res);

                dispatch(
                  boothActions.EditBooth({
                    booth: res.data,
                  })
                );

                dispatch(
                  showSnackbar("success", "Booth Updated successfully!")
                );
              } catch (error) {
                eventActions.hasError(error.message);
                console.log(error);

                dispatch(
                  showSnackbar(
                    "error",
                    "Failed to update booth, Please try again."
                  )
                );
              }
            }
          }
        );
      } else {
        console.log(id);
        console.log(formValues);

        let res = await fetch(`${BaseURL}booths/${id}/updateBooth`, {
          method: "PATCH",
          body: JSON.stringify({
            ...formValues,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        });

        if (!res.ok) {
          if (!res.message) {
            throw new Error("Something went wrong");
          } else {
            throw new Error(res.message);
          }
        }

        res = await res.json();
        console.log(res);

        dispatch(
          boothActions.EditBooth({
            booth: res.data,
          })
        );

        dispatch(
          snackbarActions.openSnackBar({
            message: "Updated booth successfully!",
            severity: "success",
          })
        );

        setTimeout(function () {
          dispatch(snackbarActions.closeSnackBar());
        }, 6000);
      }
    } catch (err) {
      boothActions.hasError(err.message);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update booth. Please try again later.",
          severity: "error",
        })
      );
      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 4000);
    }
  };
export const errorTrackerForEditBooth = () => async (dispatch, getState) => {
  dispatch(boothActions.disabledError());
};

export const deleteBooth = (id) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}booths/${id}/deleteBooth`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    dispatch(
      boothActions.DeleteBooth({
        id: res.data,
      })
    );

    dispatch(
      snackbarActions.openSnackBar({
        message: "Deleted booth successfully!",
        severity: "success",
      })
    );

    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  } catch (err) {
    dispatch(boothActions.hasError(err.message));

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to delete booth. Please try again later.",
        severity: "error",
      })
    );

    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  }
};
export const errorTrackerForDeleteBooth = () => async (dispatch, getState) => {
  dispatch(boothActions.disabledError());
};

export const createSponsor =
  (formValues, file, id) => async (dispatch, getState) => {
    dispatch(sponsorActions.startLoading());

    const key = `${id}/${UUID()}.jpeg`;

    try {
      if (file) {
        s3.getSignedUrl(
          "putObject",
          {
            Bucket: "bluemeet-inc",
            Key: key,
            ContentType: "image/jpeg",
          },

          async (err, presignedURL) => {
            const awsRes = await fetch(presignedURL, {
              method: "PUT",

              body: file,

              headers: {
                "Content-Type": file.type,
              },
            });

            console.log(awsRes);

            if (awsRes.status === 200) {
              dispatch(communityActions.startLoading());

              try {
                let res = await fetch(`${BaseURL}community/sponsors/${id}`, {
                  method: "POST",
                  body: JSON.stringify({
                    ...formValues,
                    image: key,
                  }),

                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().communityAuth.token}`,
                  },
                });
                if (!res.ok) {
                  if (!res.message) {
                    throw new Error("Something went wrong");
                  } else {
                    throw new Error(res.message);
                  }
                }
                res = await res.json();
                console.log(res);

                dispatch(
                  sponsorActions.CreateSponsor({
                    sponsor: res.data,
                  })
                );

                dispatch(
                  snackbarActions.openSnackBar({
                    message: "Sponsor added successfully",
                    severity: "success",
                  })
                );

                setTimeout(function () {
                  dispatch(snackbarActions.closeSnackBar());
                }, 6000);
              } catch (err) {
                dispatch(communityActions.hasError(err.message));

                dispatch(
                  snackbarActions.openSnackBar({
                    message: "Failed to add sponsor.",
                    severity: "error",
                  })
                );
                setTimeout(function () {
                  dispatch(snackbarActions.closeSnackBar());
                }, 4000);
              }
            }
          }
        );
      } else {
        let res = await fetch(`${BaseURL}community/sponsors/${id}`, {
          method: "POST",
          body: JSON.stringify({
            ...formValues,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        });
        if (!res.ok) {
          if (!res.message) {
            throw new Error("Something went wrong");
          } else {
            throw new Error(res.message);
          }
        }

        res = await res.json();
        console.log(res);

        dispatch(
          sponsorActions.CreateSponsor({
            sponsor: res.data,
          })
        );

        dispatch(
          snackbarActions.openSnackBar({
            message: "Sponsor added successfully",
            severity: "success",
          })
        );

        setTimeout(function () {
          dispatch(snackbarActions.closeSnackBar());
        }, 6000);
      }
    } catch (err) {
      console.log(err);
      dispatch(sponsorActions.hasError(err.message));

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to add sponsor.",
          severity: "error",
        })
      );
      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 4000);
    }
  };

export const errorTrackerForCreateSponsor =
  () => async (dispatch, getState) => {
    dispatch(sponsorActions.disabledError());
  };

export const fetchSponsor = (id) => async (dispatch, getState) => {
  dispatch(sponsorActions.startLoadingDetail());
  try {
    console.log(id);

    let res = await fetch(`${BaseURL}sponsors/${id}/getOne`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    dispatch(
      sponsorActions.FetchSponsor({
        sponsor: res.data,
      })
    );
  } catch (err) {
    console.log(err);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch sponsor.",
        severity: "error",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 4000);

    dispatch(sponsorActions.detailHasError(err.message));
  }
};

export const errorTrackerForFetchSponsor = () => async (dispatch, getState) => {
  dispatch(sponsorActions.disabledDetailError());
};

export const fetchSponsors =
  (id, term, sponsorStatus) => async (dispatch, getState) => {
    dispatch(sponsorActions.startLoading());

    const getSponsors = async () => {
      let fullLocation = `${BaseURL}sponsors/${id}`;

      let url = new URL(fullLocation);
      let search_params = url.searchParams;

      if (term) {
        search_params.set("text", term);
      }
      if (sponsorStatus && sponsorStatus !== "all") {
        search_params.set("sponsorStatus", sponsorStatus);
      }
      url.search = search_params.toString();
      let new_url = url.toString();

      console.log(new_url);
      let res = await fetch(new_url, {
        method: "GET",

        headers: {
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      console.log(res);
      return res;
    };
    try {
      const res = await getSponsors();
      dispatch(
        sponsorActions.FetchSponsors({
          sponsors: res.data,
        })
      );
    } catch (err) {
      dispatch(sponsorActions.hasError(err.message));
      console.log(err.response.data);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to fetch sponsors.",
          severity: "error",
        })
      );
      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 4000);
    }
  };

export const errorTrackerForFetchSponsors =
  () => async (dispatch, getState) => {
    dispatch(sponsorActions.disabledError());
  };

export const editSponsor =
  (formValues, file, id) => async (dispatch, getState) => {
    dispatch(sponsorActions.startLoadingDetail());

    const key = `${id}/${UUID()}.jpeg`;

    try {
      if (file) {
        s3.getSignedUrl(
          "putObject",

          {
            Bucket: "bluemeet-inc",
            Key: key,
            ContentType: "image/jpeg",
          },

          async (err, presignedURL) => {
            const awsRes = await fetch(presignedURL, {
              method: "PUT",

              body: file,

              headers: {
                "Content-Type": file.type,
              },
            });

            console.log(awsRes);

            if (awsRes.status === 200) {
              dispatch(communityActions.startLoading());

              try {
                let res = await fetch(`${BaseURL}sponsors/${id}/update`, {
                  method: "PATCH",
                  body: JSON.stringify({
                    ...formValues,
                    image: key,
                  }),

                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().communityAuth.token}`,
                  },
                });
                if (!res.ok) {
                  if (!res.message) {
                    throw new Error("Something went wrong");
                  } else {
                    throw new Error(res.message);
                  }
                }
                res = await res.json();
                console.log(res);

                dispatch(
                  sponsorActions.EditSponsor({
                    sponsor: res.data,
                  })
                );

                dispatch(
                  snackbarActions.openSnackBar({
                    message: "Sponsor updated successfully",
                    severity: "success",
                  })
                );

                setTimeout(function () {
                  dispatch(snackbarActions.closeSnackBar());
                }, 6000);
              } catch (err) {
                dispatch(communityActions.hasError(err.message));

                dispatch(
                  snackbarActions.openSnackBar({
                    message: "Failed to update sponsor.",
                    severity: "error",
                  })
                );
                setTimeout(function () {
                  dispatch(snackbarActions.closeSnackBar());
                }, 4000);
              }
            }
          }
        );
      } else {
        let res = await fetch(`${BaseURL}sponsors/${id}/update`, {
          method: "PATCH",
          body: JSON.stringify({
            ...formValues,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        });
        if (!res.ok) {
          if (!res.message) {
            throw new Error("Something went wrong");
          } else {
            throw new Error(res.message);
          }
        }
        res = await res.json();
        console.log(res);

        dispatch(
          sponsorActions.EditSponsor({
            sponsor: res.data,
          })
        );

        dispatch(
          snackbarActions.openSnackBar({
            message: "Sponsor updated successfully",
            severity: "success",
          })
        );

        setTimeout(function () {
          dispatch(snackbarActions.closeSnackBar());
        }, 6000);
      }
    } catch (err) {
      dispatch(sponsorActions.detailHasError(err.message));
      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update sponsor.",
          severity: "error",
        })
      );
      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 4000);
    }
  };
export const errorTrackerForEditSponsor = () => async (dispatch, getState) => {
  dispatch(sponsorActions.disabledDetailError());
};

export const deleteSponsor = (id) => async (dispatch, getState) => {
  dispatch(sponsorActions.startLoading());
  try {
    let res = await fetch(`${BaseURL}sponsors/${id}/delete`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    dispatch(
      sponsorActions.DeleteSponsor({
        id: res.data,
      })
    );

    dispatch(
      snackbarActions.openSnackBar({
        message: "Sponsor deleted successfully",
        severity: "success",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 4000);
  } catch (err) {
    console.log(err);
    dispatch(sponsorActions.hasError(err.message));

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to delete sponsor.",
        severity: "error",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  }
};
export const errorTrackerForDeleteSponsor =
  () => async (dispatch, getState) => {
    dispatch(sponsorActions.disabledError());
  };

export const createTicket = (formValues, id) => async (dispatch, getState) => {
  dispatch(ticketActions.startLoading());
  try {
    console.log(id);
    console.log(formValues);

    let res = await fetch(`${BaseURL}community/${id}/addTicket`, {
      method: "POST",
      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      ticketActions.CreateTicket({
        ticket: res.data,
      })
    );

    dispatch(showSnackbar("success", "Ticket created successfully!"));
  } catch (err) {
    dispatch(ticketActions.hasError(err.message));

    dispatch(
      showSnackbar("error", "Failed to create ticket, Please try again.")
    );
  }
};
export const errorTrackerForCreateTicket = () => async (dispatch, getState) => {
  dispatch(ticketActions.disabledError());
};

export const fetchTickets = (id, term) => async (dispatch, getState) => {
  dispatch(ticketActions.startLoading());

  const getTickets = async () => {
    console.log(id);
    let fullLocation = `${BaseURL}events/${id}/tickets`;

    let url = new URL(fullLocation);
    let search_params = url.searchParams;

    if (term) {
      search_params.set("text", term);
    }

    url.search = search_params.toString();
    let new_url = url.toString();

    console.log(new_url);

    let res = await fetch(new_url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    return res;
  };
  try {
    const res = await getTickets();
    dispatch(
      ticketActions.FetchTickets({
        tickets: res.data.tickets,
      })
    );
  } catch (err) {
    dispatch(ticketActions.hasError(err.message));
    console.log(err);

    dispatch(
      showSnackbar("error", "Failed to fetch tickets, Please try again.")
    );
  }
};

export const errorTrackerForFetchTickets = () => async (dispatch, getState) => {
  dispatch(ticketActions.disabledError());
};

export const fetchTicket = (id) => async (dispatch, getState) => {
  dispatch(ticketActions.startLoadingDetail());

  try {
    console.log(id);

    let res = await fetch(`${BaseURL}events/${id}/ticket`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      ticketActions.FetchTicket({
        ticket: res.data,
      })
    );
  } catch (err) {
    dispatch(ticketActions.detailHasError(err.message));
    dispatch(
      showSnackbar("error", "Failed to fetch ticket, Please try again.")
    );
  }
};
export const errorTrackerForFetchTicket = () => async (dispatch, getState) => {
  dispatch(ticketActions.disabledDetailError());
};
export const editTicket = (formValues, id) => async (dispatch, getState) => {
  dispatch(ticketActions.startLoadingDetail());
  try {
    console.log(id);
    console.log(formValues);

    let res = await fetch(`${BaseURL}events/${id}/updateTicket`, {
      method: "PATCH",
      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      ticketActions.EditTicket({
        ticket: res.data,
      })
    );

    dispatch(showSnackbar("success", "Ticket updated successfully!"));
  } catch (err) {
    dispatch(ticketActions.detailHasError(err.message));
    dispatch(
      showSnackbar("error", "Failed to update ticket, Please try again.")
    );
  }
};
export const errorTrackerForEditTicket = () => async (dispatch, getState) => {
  dispatch(ticketActions.disabledDetailError());
};

export const deleteTicket = (id) => async (dispatch, getState) => {
  dispatch(ticketActions.startLoading());

  try {
    let res = await fetch(`${BaseURL}events/${id}/deleteTicket`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      ticketActions.DeleteTicket({
        id: res.data,
      })
    );

    dispatch(showSnackbar("success", "Ticket deleted successfully!"));
  } catch (err) {
    dispatch(ticketActions.hasError(err.message));
    dispatch(
      showSnackbar("error", "Failed to delete ticket, Please try again.")
    );
  }
};
export const errorTrackerForDeleteTicket = () => async (dispatch, getState) => {
  dispatch(ticketActions.disabledError());
};
//navigations actions

export const navigationIndex = (activeIndex) => (dispatch) => {
  dispatch(
    navigationActions.activeIndex({
      currentIndex: activeIndex,
    })
  );
};
export const navigationIndexForCommunityDash = (activeIndex) => (dispatch) => {
  dispatch(
    navigationActions.activeIndexForCommunityDash({
      currentIndex: activeIndex,
    })
  );
};
export const navigationIndexForEditEvent = (activeIndex) => (dispatch) => {
  dispatch(
    navigationActions.activeIndexForEditEvent({
      currentIndex: activeIndex,
    })
  );
};
export const navigationIndexForSpecificEvent = (activeIndex) => (dispatch) => {
  dispatch(
    navigationActions.activeIndexForSpecificEvent({
      currentIndex: activeIndex,
    })
  );
};
export const navigationIndexForHostingPlatform =
  (activeIndex) => (dispatch) => {
    dispatch(
      navigationActions.activeIndexForHostingPlatform({
        currentIndex: activeIndex,
      })
    );
  };

export const setBoothNavigationIndex = (activeIndex) => (dispatch) => {
  dispatch(
    navigationActions.activeIndexForEditBooth({
      currentIndex: activeIndex,
    })
  );
};

//alias routes
export const madeJustForYou = () => async (dispatch) => {
  dispatch(eventActions.startLoading());
  try {
    const res = await eureka.get("eureka/v1/exploreEvents/madeJustForYou");
    console.log(res.data, "This is made just for you");

    dispatch(
      eventActions.FetchEvents({
        events: res.data.data.events,
      })
    );
  } catch (err) {
    dispatch(eventActions.hasError(err.message));
    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch events. Please try again later.",
        severity: "error",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  }
};

export const errorTrackerForMadeJustForYou =
  () => async (dispatch, getState) => {
    dispatch(eventActions.disabledError());
  };

export const fetchLobbyUsers = (users) => async (dispatch, getState) => {
  try {
    console.log(users);
    dispatch(
      userActions.FetchUsers({
        users: users,
      })
    );
  } catch (err) {
    console.log(err);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch Users in lobby. Please try again later.",
        severity: "error",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  }
};

export const fetchUsers = (id) => async (dispatch, getState) => {
  try {
    console.log(id);

    let res = await fetch(`${BaseURL}events/${id}/speakers`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      speakerActions.FetchSpeakers({
        speakers: res.data.speakers.speaker,
      })
    );
  } catch (err) {
    console.log(err);

    dispatch(speakerActions.hasError(err.message));

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch users. Please try again later.",
        severity: "error",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  }
};
export const errorTrackerForFetchSpeakers2 =
  () => async (dispatch, getState) => {
    dispatch(speakerActions.disabledError());
  };
export const fetchUser = (formValues) => async (dispatch, getState) => {
  dispatch(userActions.startLoading());

  try {
    const res = await fetch(`${BaseURL}users/Me`, {
      headers: {
        //  "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();
    console.log(result);
    // console.warn(xhr.responseText)
    console.log(result.data.userData);
    dispatch(
      userActions.FetchUser({
        user: result.data.userData,
      })
    );
  } catch (err) {
    console.log(err);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch user. Please try again later.",
        severity: "error",
      })
    );
    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);

    dispatch(userActions.hasError(err.message));
  }
};
export const errorTrackerForFetchuser = () => async (dispatch, getState) => {
  dispatch(speakerActions.disabledError());
};

export const editUser = (formValues, file) => async (dispatch, getState) => {
  dispatch(userActions.startLoading());
  const key = `${UUID()}.jpeg`;

  if (file) {
    try {
      s3.getSignedUrl(
        "putObject",
        {
          Bucket: "bluemeet-inc",
          Key: key,
          ContentType: "image/jpeg",
        },

        async (err, presignedURL) => {
          const awsRes = await fetch(presignedURL, {
            method: "PUT",

            body: file,

            headers: {
              "Content-Type": file.type,
            },
          });

          console.log(awsRes);

          if (awsRes.status === 200) {
            try {
              const res = await fetch(`${BaseURL}users/updateMe`, {
                method: "PATCH",
                body: JSON.stringify({
                  ...formValues,
                  image: key,
                }),

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getState().auth.token}`,
                },
              });

              if (!res.ok) {
                if (!res.message) {
                  throw new Error("Something went wrong");
                } else {
                  throw new Error(res.message);
                }
              }

              const result = await res.json();

              dispatch(
                userActions.EditUser({
                  user: result.data.userData,
                })
              );

              dispatch(
                snackbarActions.openSnackBar({
                  message: "User profile updated successfully",
                  severity: "success",
                })
              );

              setTimeout(function () {
                dispatch(snackbarActions.closeSnackBar());
              }, 6000);
            } catch (err) {
              dispatch(communityActions.hasError(err.message));

              dispatch(
                snackbarActions.openSnackBar({
                  message: "Failed to update profile. Please try again later",
                  severity: "error",
                })
              );
              setTimeout(function () {
                dispatch(snackbarActions.closeSnackBar());
              }, 4000);
            }
          }
        }
      );
    } catch (error) {
      dispatch(userActions.hasError(error.message));
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update profile. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  } else {
    try {
      const res = await fetch(`${BaseURL}users/updateMe`, {
        method: "PATCH",
        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      dispatch(
        userActions.EditUser({
          user: result.data.userData,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "User profile updated successfully",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      dispatch(userActions.hasError(error.message));
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update profile. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  }
};

export const errorTrackerForEditUser = () => async (dispatch, getState) => {
  dispatch(userActions.disabledError());
};

export const editUserPassword = (formValues) => async (dispatch, getState) => {
  dispatch(userActions.startLoading());
  try {
    console.log(formValues);

    const res = await fetch(`${BaseURL}users/updatePassword`, {
      method: "PATCH",
      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    const result = await res.json();

    if (result.wrongPassword) {
      dispatch(
        showSnackbar("error", "You have entered wrong current password.")
      );
    } else {
      dispatch(
        userActions.EditUser({
          user: result.data.userData,
        })
      );
      dispatch(
        authActions.SignIn({
          token: result.token,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Password updated successfully",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  } catch (err) {
    dispatch(userActions.hasError(err.message));

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to update password. Please try again later.",
        severity: "error",
      })
    );

    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  }
};
export const errorTrackerForEditUserPassword =
  () => async (dispatch, getState) => {
    dispatch(userActions.disabledError());
  };
export const errorTrackerForEditUserPassword2 =
  () => async (dispatch, getState) => {
    dispatch(userActions.disabledError());
  };
export const deleteUser = () => (dispatch, getState) => {};

export const fetchCommunity = (id) => async (dispatch, getState) => {
  dispatch(communityActions.startLoading());
  try {
    const res = await fetch(`${BaseURL}community/${id}/getCommunity`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    const result = await res.json();
    console.log(result);

    dispatch(
      communityActions.FetchCommunity({
        community: result.data.community,
      })
    );
  } catch (err) {
    dispatch(communityActions.hasError(err.message));
    console.log(err);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch communitiy. Please try again later.",
        severity: "error",
      })
    );

    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  }
};
export const errorTrackerForFetchCommunity =
  () => async (dispatch, getState) => {
    dispatch(communityActions.disabledError());
  };

export const editCommunity = (id, formValues) => async (dispatch, getState) => {
  dispatch(communityActions.startLoading());
  try {
    const res = await fetch(`${BaseURL}community/${id}/updateCommunity`, {
      method: "PATCH",
      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    const result = await res.json();

    console.log(result);

    dispatch(
      communityActions.EditCommunity({
        community: result.data,
      })
    );

    dispatch(
      snackbarActions.openSnackBar({
        message: "Community profile updated successfully",
        severity: "success",
      })
    );

    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  } catch (err) {
    dispatch(communityActions.hasError(err.message));

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to update community profile. Please try again later.",
        severity: "error",
      })
    );

    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  }
};

export const downgradeToFree =
  (communityId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}community/downgradeToFree`, {
        method: "POST",
        body: JSON.stringify({
          communityId: communityId,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(
        communityActions.EditCommunity({
          community: result.data,
        })
      );

      handleClose();

      dispatch(
        snackbarActions.openSnackBar({
          message:
            "Downgraded to free. Changes will apply from next Billing Date.",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to downgrade to free. Please try again.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const restartMembership =
  (communityId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}community/restartMembership`, {
        method: "POST",
        body: JSON.stringify({
          communityId: communityId,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(
        communityActions.EditCommunity({
          community: result.data,
        })
      );

      handleClose();

      dispatch(
        snackbarActions.openSnackBar({
          message: "Membership restarted successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to restart your membership. Please try again.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const errorTrackerForEditCommunity =
  () => async (dispatch, getState) => {
    dispatch(communityActions.disabledError());
  };

export const deleteCommunity = (id) => async (dispatch, getState) => {
  dispatch(communityActions.startLoading());
  try {
    const res = await fetch(
      `${BaseURL}community/${id}`,

      {
        method: "GET",
      }
    );
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    const result = await res.json();

    console.log(result);
    dispatch(
      communityActions.FetchCommunity({
        community: result.community,
      })
    );
  } catch (err) {
    dispatch(communityActions.hasError(err.message));
  }
};
///session actions
export const errorTrackerForDeleteCommunity =
  () => async (dispatch, getState) => {
    dispatch(communityActions.disabledError());
  };
export const createSession = (formValues, id) => async (dispatch, getState) => {
  dispatch(sessionActions.startLoading());
  try {
    console.log(id);
    console.log(formValues);

    let res = await fetch(`${BaseURL}events/${id}/addSession`, {
      method: "POST",
      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      sessionActions.CreateSession({
        session: res.data,
      })
    );

    dispatch(
      snackbarActions.openSnackBar({
        message: "New activity added successfully!",
        severity: "success",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  } catch (err) {
    console.log(err);

    dispatch(sessionActions.hasError(err.message));

    dispatch(
      snackbarActions.openSnackBar({
        message: "Adding session failed. Please try again later.",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};
export const errorTrackerForCreateSession =
  () => async (dispatch, getState) => {
    dispatch(communityActions.disabledError());
  };
export const fetchSessions = (id, term) => async (dispatch, getState) => {
  dispatch(sessionActions.startLoading());
  const getSessions = async () => {
    console.log(id);
    let fullLocation = `${BaseURL}events/${id}/sessions`;
    let url = new URL(fullLocation);
    let search_params = url.searchParams;

    if (term) {
      search_params.set("text", term);
    }

    url.search = search_params.toString();
    let new_url = url.toString();

    console.log(new_url);

    let res = await fetch(new_url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);
    console.log(res.data.sessions);
    return res;
  };
  try {
    const res = await getSessions();
    dispatch(
      sessionActions.FetchSessions({
        sessions: res.data.sessions,
      })
    );
  } catch (err) {
    dispatch(
      snackbarActions.openSnackBar({
        message: "Fetching sessions failed. Please try again later.",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);

    dispatch(sessionActions.hasError(err.message));
    console.log(err);
  }
};

export const errorTrackerForFetchSessions =
  () => async (dispatch, getState) => {
    dispatch(sessionActions.disabledError());
  };

export const fetchSessionsForUser =
  (id, term) => async (dispatch, getState) => {
    dispatch(sessionActions.startLoading());
    try {
      console.log(id);
      let fullLocation = `${BaseURL}events/${id}/sessionsForUser`;
      let url = new URL(fullLocation);
      let search_params = url.searchParams;

      if (term) {
        search_params.set("text", term);
      }

      url.search = search_params.toString();
      let new_url = url.toString();

      console.log(new_url);

      let res = await fetch(new_url, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(
        sessionActions.FetchSessions({
          sessions: res.data.sessions,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(sessionActions.hasError(err.message));

      dispatch(
        snackbarActions.openSnackBar({
          message: "Fetching sessions failed. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };
export const errorTrackerForFetchSessionsForUser =
  () => async (dispatch, getState) => {
    dispatch(sessionActions.disabledError());
  };
export const fetchSession = (id) => async (dispatch, getState) => {
  dispatch(sessionActions.startLoading());
  try {
    console.log(id);

    let res = await fetch(
      `${BaseURL}events/${id}/sessions`,

      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      }
    );
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      sessionActions.FetchSession({
        sessions: res.data.sessions.session,
      })
    );
  } catch (err) {
    console.log(err);
    dispatch(sessionActions.hasError(err.message));

    dispatch(
      snackbarActions.openSnackBar({
        message: "Fetching sessions failed. Please try again later.",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};
export const errorTrackerForFetchSession = () => async (dispatch, getState) => {
  dispatch(sessionActions.disabledError());
};
export const fetchSessionForSessionStage =
  (id) => async (dispatch, getState) => {
    try {
      console.log(id);

      let res = await fetch(`${BaseURL}sessions/${id}/getOneSession`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });

      res = await res.json();
      console.log(res);
      console.log(res.data.session);

      dispatch(
        sessionActions.FetchSession({
          session: res.data.session,
        })
      );
    } catch (err) {
      dispatch(
        snackbarActions.openSnackBar({
          message: "Fetching sessions failed. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
      dispatch(sessionActions.hasError(err.message));
    }
  };
export const errorTrackerForFetchSessionForSessionStage =
  () => async (dispatch, getState) => {
    dispatch(sessionActions.disabledError());
  };
export const fetchParticularSessionOfEvent =
  (id) => async (dispatch, getState) => {
    dispatch(sessionActions.startLoadingDetail());
    try {
      const existingSession = getState().session.sessions.find((session) => {
        return session.id === id;
      });

      console.log(existingSession);
      if (!existingSession) {
        //console.log(id, "I am passing from particularEvent action");

        const res = await fetch(
          `${BaseURL}sessions/${id}`,

          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${getState().communityAuth.token}`,
            },
          }
        );

        if (!res.ok) {
          if (!res.message) {
            throw new Error("Something went wrong");
          } else {
            throw new Error(res.message);
          }
        }

        const result = await res.json();

        console.log(result);

        dispatch(
          sessionActions.FetchSession({
            session: result.data.session,
          })
        );
      } else {
        dispatch(
          sessionActions.FetchSession({
            session: existingSession,
          })
        );
      }
    } catch (err) {
      dispatch(
        snackbarActions.openSnackBar({
          message: "Fetching session details failed please try again later!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);

      dispatch(sessionActions.detailHasError(err.message));
      console.log(err);
    }
  };

export const errorTrackerForFetchParticularSessionOfEvent =
  () => async (dispatch, getState) => {
    dispatch(sessionActions.disabledDetailError());
  };

export const editSession = (formValues, id) => async (dispatch, getState) => {
  dispatch(sessionActions.startLoadingDetail());
  try {
    console.log(formValues);

    const res = await fetch(`${BaseURL}sessions/${id}/update`, {
      method: "POST",
      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    const result = await res.json();

    console.log(result, result.data);
    console.log(result.data);
    dispatch(
      sessionActions.EditSession({
        session: result.data.updatedSession,
      })
    );

    dispatch(
      snackbarActions.openSnackBar({
        message: "Session updated successfully!",
        severity: "success",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  } catch (err) {
    dispatch(sessionActions.detailHasError(err.message));

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to update session. Please try again later!",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};
export const errorTrackerForEditSession = () => async (dispatch, getState) => {
  dispatch(sessionActions.disabledDetailError());
};
export const deleteSession = (id) => async (dispatch, getState) => {
  dispatch(sessionActions.startLoading());

  try {
    console.log(id);

    let res = await fetch(`${BaseURL}sessions/${id}/delete`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      sessionActions.DeleteSession({
        id: res.data.id,
      })
    );

    dispatch(
      snackbarActions.openSnackBar({
        message: "Session removed successfully!",
        severity: "success",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  } catch (err) {
    dispatch(sessionActions.hasError(err.message));
    console.log(err);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Deleting session failed. Please try again later.",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};
export const errorTrackerForDeleteSession =
  () => async (dispatch, getState) => {
    dispatch(sessionActions.disabledError());
  };
export const fetchNetworking = (id) => async (dispatch, getState) => {
  dispatch(networkingActions.startLoading());

  const getNetworkSettings = async () => {
    console.log(id);

    let res = await fetch(`${BaseURL}events/${id}/getNetworkSettings`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    return res;
  };
  try {
    const res = await getNetworkSettings();
    dispatch(
      networkingActions.FetchNetworking({
        settings: res.data.networkingSettings,
      })
    );
  } catch (err) {
    dispatch(networkingActions.hasError(err.message));
    console.log(err);
  }
};
export const errorTrackerForFetchNetworking =
  () => async (dispatch, getState) => {
    dispatch(networkingActions.disabledError());
  };

export const editNetworking =
  (formValues, id) => async (dispatch, getState) => {
    dispatch(networkingActions.startLoading());
    try {
      console.log(id);

      let res = await fetch(`${BaseURL}events/${id}/updateNetworking`, {
        method: "PATCH",

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res.data);

      dispatch(
        networkingActions.EditNetworking({
          settings: res.data.networkingSettings,
        })
      );
    } catch (err) {
      networkingActions.hasError(err.message);
      console.log(err);
    }
  };
export const errorTrackerForEditNetworking =
  () => async (dispatch, getState) => {
    dispatch(networkingActions.disabledError());
  };

export const createCoupon =
  (formValues, eventId) => async (dispatch, getState) => {
    dispatch(couponActions.startLoading());
    try {
      console.log(formValues);

      let res = await fetch(
        `${BaseURL}community/coupons/createNew/${eventId}`,
        {
          method: "POST",
          body: JSON.stringify({
            ...formValues,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        couponActions.CreateCoupon({
          coupon: res.data,
        })
      );

      dispatch(showSnackbar("success", "Coupon created successfully!"));
    } catch (err) {
      dispatch(couponActions.hasError(err.message));
      console.log(err);

      dispatch(
        showSnackbar("error", "Failed to create coupon, Please try again.")
      );
    }
  };
export const errorTrackerForCreateCoupon = () => async (dispatch, getState) => {
  dispatch(couponActions.disabledError());
};

export const fetchEventCoupons = (eventId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}getCoupons/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    dispatch(
      couponActions.FetchCoupons({
        coupons: res.data,
      })
    );

    dispatch(
      ticketActions.FetchTickets({
        tickets: res.tickets,
      })
    );
  } catch (error) {
    dispatch(couponActions.hasError(error.message));

    dispatch(
      showSnackbar("error", "Failed to fetch coupons, Please try again.")
    );
  }
};

export const fetchCoupons = (eventId) => async (dispatch, getState) => {
  dispatch(couponActions.startLoading());

  const getCoupons = async () => {
    let res = await fetch(`${BaseURL}community/coupons/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);
    return res;
  };
  try {
    const res = await getCoupons();
    dispatch(
      couponActions.FetchCoupons({
        coupons: res.data,
      })
    );

    dispatch(
      ticketActions.FetchTickets({
        tickets: res.tickets,
      })
    );
  } catch (err) {
    dispatch(couponActions.hasError(err.message));

    dispatch(
      showSnackbar("error", "Failed to fetch coupons, Please try again.")
    );
  }
};
export const errorTrackerForFetchCoupons = () => async (dispatch, getState) => {
  dispatch(couponActions.disabledError());
};

export const fetchCoupon = (id) => async (dispatch, getState) => {
  dispatch(couponActions.startLoadingDetail());

  try {
    console.log(id);

    let res = await fetch(`${BaseURL}community/${id}/getOneCoupon`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      couponActions.FetchCoupon({
        coupon: res.data,
      })
    );
  } catch (err) {
    dispatch(couponActions.detailHasError(err.message));
    console.log(err);

    dispatch(
      showSnackbar("error", "Failed to fetch coupon, Please try again.")
    );
  }
};
export const errorTrackerForFetchCoupon = () => async (dispatch, getState) => {
  dispatch(couponActions.disabledDetailError());
};

export const editCoupon = (formValues, id) => async (dispatch, getState) => {
  dispatch(couponActions.startLoadingDetail());
  try {
    let res = await fetch(`${BaseURL}community/${id}/updateCoupon`, {
      method: "PATCH",

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res.data);

    dispatch(
      couponActions.EditCoupon({
        coupon: res.data,
      })
    );

    dispatch(showSnackbar("success", "Coupon updated successfully!"));
  } catch (err) {
    dispatch(couponActions.detailHasError(err.message));
    console.log(err);

    dispatch(
      showSnackbar("error", "Failed to update coupon, Please try again.")
    );
  }
};
export const errorTrackerForEditCoupon = () => async (dispatch, getState) => {
  dispatch(couponActions.disabledDetailError());
};

export const deleteCoupon = (id) => async (dispatch, getState) => {
  dispatch(couponActions.startLoading());

  try {
    console.log(id);

    let res = await fetch(`${BaseURL}community/${id}/deleteCoupon`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      couponActions.DeleteCoupon({
        id: res.data.id,
      })
    );

    dispatch(showSnackbar("success", "Coupon deleted successfully!"));
  } catch (err) {
    dispatch(couponActions.hasError(err.message));
    console.log(err);

    dispatch(
      showSnackbar("error", "Failed to delete coupon, Please try again.")
    );
  }
};
export const errorTrackerForDeleteCoupon = () => async (dispatch, getState) => {
  dispatch(couponActions.disabledError());
};

export const getStripeConnectLink =
  (userId, communityId) => async (dispatch, getState) => {
    console.log("I entered connect to stripe action");
    try {
      let res = await fetch(`${BaseURL}stripe/getConnectFlowLink`, {
        method: "POST",

        body: JSON.stringify({
          return_url: `https://6031-182-70-236-184.ngrok.io/check-stripe-status/user/${userId}/community/${communityId}/account/`,
          refresh_url: `https://6031-182-70-236-184.ngrok.io/not-onboarded-yet/user/${userId}/community/${communityId}/account/`,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      res = await res.json();
      console.log(res);
      window.location.href = res.links.url;
    } catch (err) {
      console.log(err);
    }
  };

export const getEventRegistrationCheckoutSession =
  (formValues) => async (dispatch, getState) => {
    console.log(formValues);
    try {
      const res = await fetch(`${BaseURL}stripe/createCheckoutSession`, {
        method: "POST",

        body: JSON.stringify(formValues),

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();
      console.log(result);

      window.location.href = result.session.url;
    } catch (error) {
      console.log(error);
    }
  };

export const createQuery = (formValues) => async (dispatch, getState) => {
  try {
    console.log(formValues);

    let res = await fetch(`${BaseURL}users/query/createNew`, {
      method: "POST",
      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    res = await res.json();
    console.log(res);

    // dispatch(
    //   couponActions.CreateCoupon({
    //     coupon: res.data,
    //   })
    // );
  } catch (err) {
    console.log(err);
  }
};

export const createCommunityFeedback =
  (formValues) => async (dispatch, getState) => {
    try {
      console.log(formValues);

      let res = await fetch(`${BaseURL}feedback/community`, {
        method: "POST",
        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      res = await res.json();
      console.log(res);

      // dispatch(
      //   couponActions.CreateCoupon({
      //     coupon: res.data,
      //   })
      // );
    } catch (err) {
      console.log(err);
    }
  };

export const fetchQueriesForCommunity =
  (term, event, answerStatus, userRegistrationStatus) =>
  async (dispatch, getState) => {
    dispatch(queriesActions.startLoading());

    console.log(term, event, answerStatus, userRegistrationStatus);
    const fetchQueries = async () => {
      let fullLocation = `${BaseURL}community/queries/getAll`;
      let url = new URL(fullLocation);
      let search_params = url.searchParams;

      if (term) {
        search_params.set("text", term);
      }
      if (event && event !== "all") {
        search_params.set("event", event);
      }
      if (answerStatus && answerStatus !== "all") {
        search_params.set("answerStatus", answerStatus);
      }
      if (userRegistrationStatus && userRegistrationStatus !== "all") {
        search_params.set("userRegistrationStatus", userRegistrationStatus);
      }

      url.search = search_params.toString();
      let new_url = url.toString();

      console.log(new_url);
      let res = await fetch(new_url, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      return res;
    };
    try {
      const res = await fetchQueries();
      console.log(res);

      dispatch(
        queriesActions.FetchQueries({
          queries: res.data,
        })
      );
    } catch (err) {
      dispatch(queriesActions.hasError(err.message));
      console.log(err.response.data);
    }
  };
export const errorTrackerForfetchQueriesForCommunity =
  () => async (dispatch, getState) => {
    dispatch(queriesActions.disabledError());
  };

export const answerQuery = (answerText, id) => async (dispatch, getState) => {
  dispatch(queriesActions.startLoading());

  try {
    let res = await fetch(`${BaseURL}community/queries/createAnswer`, {
      method: "PATCH",
      body: JSON.stringify({
        answerText: answerText,
        queryId: id,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      queriesActions.EditQuery({
        query: res.data,
      })
    );
  } catch (err) {
    console.log(err);

    dispatch(queriesActions.hasError(err.message));
  }
};
export const errorTrackerForAnswerQuery = () => async (dispatch, getState) => {
  dispatch(queriesActions.disabledError());
};

export const googleLinkClicked = () => async (dispatch, getState) => {
  dispatch(
    googleAuthActions.TrackerGoogleLogin({
      isClicked: true,
    })
  );
};

export const forgotPassword = (formValues) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}forgotPassword`, {
      method: "POST",
      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    res = await res.json();
    console.log(res);

    dispatch(
      showSnackbar(
        "success",
        "We have sent a password reset link if there is an account with this email."
      )
    );
  } catch (err) {
    console.log(err);
    dispatch(showSnackbar("error", "There is no user with this email."));
  }
};
export const resetPassword =
  (formValues, token) => async (dispatch, getState) => {
    dispatch(userActions.startLoading());

    try {
      let res = await fetch(`${BaseURL}users/resetPassword/${token}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        authActions.SignIn({
          token: res.token,

          isSignedIn: true,
        })
      );
      dispatch(
        userActions.CreateUser({
          user: res.data.user,
        })
      );

      dispatch(showSnackbar("success", "Password changed successfully!"));

      window.location.href = REACT_APP_MY_ENV
        ? "http://localhost:3001/user/home"
        : "https://www.bluemeet.in/user/home";
    } catch (err) {
      console.log(err);
      dispatch(userActions.hasError(err.message));
      dispatch(authActions.hasError(err.message));
      dispatch(
        showSnackbar(
          "error",
          "Token is invalid or has expired. Please try again by requesting new reset link."
        )
      );
    }
  };
export const errorTrackerForResetPassword =
  () => async (dispatch, getState) => {
    dispatch(userActions.disabledError());
    dispatch(authActions.disabledError());
  };
export const fetchRegistrationsOfParticularCommunity =
  (communityId) => async (dispatch, getState) => {
    dispatch(registrationActions.startLoading());

    const fetchRegistration = async () => {
      console.log(communityId);

      let res = await fetch(`${BaseURL}registrations/community/getAll`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      console.log(res);

      return res;
    };
    try {
      const res = await fetchRegistration();
      dispatch(
        registrationActions.FetchRegistrations({
          registrations: res.data,
        })
      );
    } catch (err) {
      dispatch(registrationActions.hasError(err.message));
      console.log(err);
    }
  };
export const errorTrackerForfetchRegistrationsOfParticularCommunity =
  () => async (dispatch, getState) => {
    dispatch(registrationActions.disabledError());
  };

export const fetchRegistrationsOfParticularEvent =
  (eventId) => async (dispatch, getState) => {
    dispatch(registrationActions.startLoading());

    const fetchRegistration = async () => {
      console.log(eventId);

      let res = await fetch(
        `${BaseURL}registrations/event/${eventId}/getAllRegistration`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      return res;
    };
    try {
      const res = await fetchRegistration();
      dispatch(
        registrationActions.FetchRegistrations({
          registrations: res.data,
        })
      );
    } catch (err) {
      dispatch(registrationActions.hasError(err.message));
      console.log(err);
    }
  };

export const fetchEventRegistrations =
  (eventId) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}getEventRegistrations/${eventId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(
        registrationActions.FetchRegistrations({
          registrations: res.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const errorTrackerForFetchRegistrationsOfParticularEvent =
  () => async (dispatch, getState) => {
    dispatch(registrationActions.disabledError());
  };

export const fetchParticularRegistration =
  (id) => async (dispatch, getState) => {
    dispatch(registrationActions.startLoading());
    try {
      console.log(id);

      let res = await fetch(`${BaseURL}registrations/${id}/getOne`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        registrationActions.FetchRegistration({
          registration: res.data,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(registrationActions.hasError(err.message));
    }
  };
export const errorTrackerForFetchParticularRegistration =
  () => async (dispatch, getState) => {
    dispatch(registrationActions.disabledError());
  };

export const createNewInvitation =
  (formValues) => async (dispatch, getState) => {
    try {
      console.log(formValues);

      let res = await fetch(`${BaseURL}team-invites/create-new`, {
        method: "POST",
        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      res = await res.json();
      console.log(res);

      dispatch(
        communityActions.SendTeamInvitation({
          invitation: res.newlyCreatedInvitation,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

export const generateEventAccessToken =
  (id, email, role) => async (dispatch, getState) => {
    try {
      dispatch(
        eventAccessActions.CreateEventAccess({
          role: role,
          id: id,
          email: email,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

export const setSessionRoleAndJoinSession =
  (sessionRole) => async (dispatch, getState) => {
    try {
      dispatch(
        eventAccessActions.setSessionRole({
          sessionRole: sessionRole,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

export const createSocket = (socket) => async (dispatch, getState) => {
  try {
    dispatch(
      socketActions.CreateSocket({
        socket: socket,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

// export const getCurrentUsers = (eventId) => async (dispatch, getState) => {
//   try{
//       console.log(eventId);

//       let res = await fetch(
//         `${BaseURL}getCurrentUsers/${eventId}`,
//         {
//           method: "GET",

//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getState().auth.token}`,
//           },
//         }
//       );

//       res = await res.json();
//       console.log(res);

//   }
//   catch(error) {
//     console.log(error);
//   }
// }

export const fetchChairArrangement =
  (roomChairs) => async (dispatch, getState) => {
    dispatch(roomsActions.HasChanged({}));

    dispatch(
      roomsActions.FetchRoomsChairs({
        chairs: roomChairs,
      })
    );
  };

export const fetchBoothChairs = (roomChairs) => async (dispatch, getState) => {
  dispatch(roomsActions.HasChanged({}));

  dispatch(
    boothChairsActions.FetchBoothRoomsChairs({
      chairs: roomChairs,
    })
  );
};

export const fetchNumberOfPeopleOnTable =
  (numberOfPeopleOnTable) => async (dispatch, getState) => {
    dispatch(
      roomsActions.FetchNumOfPeopleOnTable({
        numberOfPeopleOnTable: numberOfPeopleOnTable,
      })
    );
  };

export const fetchNumberOfPeopleOnBoothTable =
  (numberOfPeopleOnTable) => async (dispatch, getState) => {
    dispatch(
      boothChairsActions.FetchBoothNumOfPeopleOnTable({
        numberOfPeopleOnTable: numberOfPeopleOnTable,
      })
    );
  };

export const getRTMTokenForSpeaker =
  (eventId, speakerId) => async (dispatch, getState) => {
    dispatch(RTMActions.startLoading());

    const fetchingRTMToken = async () => {
      let res = await fetch(`${BaseURL}getRTMTokenForSpeaker`, {
        method: "POST",
        body: JSON.stringify({
          eventId: eventId,
          speakerId: speakerId,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      return res;
    };
    try {
      let res = await fetchingRTMToken();
      console.log(res);
      const appID = "6877e158655f4810968b19e65d0bbb23";

      const client = AgoraRTM.createInstance(appID);

      await client.login(
        {
          uid: speakerId,
          token: res.token,
        },
        () => {
          console.log("logged In Successfully");
        },
        () => {
          console.log("log in failed");
        }
      );
      dispatch(
        RTMActions.fetchRTMToken({
          token: res.token,
        })
      );
      dispatch(
        RTMActions.fetchRTMClient({
          RTMClient: client,
        })
      );
    } catch (err) {
      dispatch(RTMActions.hasError(err.message));
    }
  };
export const errorTrackerForGetRTMTokenForSpeaker =
  () => async (dispatch, getState) => {
    dispatch(RTMActions.disabledError());
  };

export const getRTMToken = (eventId) => async (dispatch, getState) => {
  dispatch(RTMActions.startLoading());

  const fetchingRTMToken = async () => {
    let res = await fetch(`${BaseURL}getRTMToken`, {
      method: "POST",
      body: JSON.stringify({
        eventId: eventId,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    return res;
  };
  try {
    let res = await fetchingRTMToken();
    console.log(res);
    const appID = "6877e158655f4810968b19e65d0bbb23";

    const client = AgoraRTM.createInstance(appID);

    await client.login(
      {
        uid: getState().user.userDetails._id,
        token: res.token,
      },
      () => {
        console.log("logged In Successfully");
      },
      () => {
        console.log("log in failed");
      }
    );
    dispatch(
      RTMActions.fetchRTMToken({
        token: res.token,
      })
    );
    dispatch(
      RTMActions.fetchRTMClient({
        RTMClient: client,
      })
    );
  } catch (err) {
    dispatch(RTMActions.hasError(err.message));
  }
};
export const errorTrackerForgetRTMToken = () => async (dispatch, getState) => {
  dispatch(RTMActions.disabledError());
};

export const channelJoinedTracker = () => async (dispatch, getState) => {
  dispatch(RTMActions.joinChannelTracker());
};

export const connectToRTMServer = (client) => async (dispatch, getState) => {
  dispatch(
    RTMActions.fetchRTMClient({
      RTMClient: client,
    })
  );
};

export const fetchEventChats = (chats) => async (dispatch, getState) => {
  dispatch(eventChatActions.startLoading());
  try {
    dispatch(
      eventChatActions.FetchEventChats({
        eventChats: chats,
      })
    );
  } catch (err) {
    dispatch(eventChatActions.hasError(err.message));
  }
};

export const updateTableChats = (chats) => async (dispatch, getState) => {
  dispatch(
    roomsActions.FetchTableChats({
      chats: chats,
    })
  );
};

export const updateBoothTableChats = (chats) => async (dispatch, getState) => {
  dispatch(
    boothChairsActions.FetchBoothTableChats({
      tableChats: chats,
    })
  );
};

export const updateBoothChats = (chats) => async (dispatch, getState) => {
  dispatch(
    boothActions.FetchBoothChats({
      chats: chats,
    })
  );
};

export const fetchSessionChats = (chats) => async (dispatch, getState) => {
  dispatch(sessionChatActions.startLoading());
  try {
    dispatch(
      sessionChatActions.FetchSessionChats({
        sessionChats: chats,
      })
    );
  } catch (err) {
    dispatch(sessionChatActions.hasError(err.message));
  }
};

export const fetchBackstageChats = (chats) => async (dispatch, getState) => {
  dispatch(sessionChatActions.startLoading());
  try {
    dispatch(
      sessionChatActions.FetchBackstageChats({
        backstageChats: chats,
      })
    );
  } catch (error) {
    dispatch(sessionChatActions.hasError(error.message));
  }
};

export const deleteSessionChat = (chat) => async (dispatch, getState) => {
  dispatch(
    sessionChatActions.DeleteSessionChats({
      chat: chat,
    })
  );
};

export const deleteBackstageChat = (chat) => async (dispatch, getState) => {
  dispatch(
    sessionChatActions.DeleteBackstageChats({
      chat: chat,
    })
  );
};

export const errorTrackerForfetchEventChats =
  () => async (dispatch, getState) => {
    dispatch(eventChatActions.disabledError());
  };

export const fetchPreviousEventChatMessages =
  (eventId) => async (dispatch, getState) => {
    dispatch(eventChatActions.startLoading());
    try {
      console.log(eventId);

      let res = await fetch(`${BaseURL}getPreviousEventMsg/${eventId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        eventChatActions.FetchEventChats({
          eventChats: res.data.chatMessages,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
export const errorTrackerForFetchPreviousEventChatMessages =
  () => async (dispatch, getState) => {
    dispatch(eventChatActions.disabledError());
  };

export const fetchPreviousEventPolls =
  (eventId) => async (dispatch, getState) => {
    dispatch(eventPollActions.startLoading());
    try {
      console.log(eventId);

      let res = await fetch(`${BaseURL}getPreviousEventPolls/${eventId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        eventPollActions.FetchEventPolls({
          eventPolls: res.data.polls,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
export const errorTrackerForFetchPreviousEventPolls =
  () => async (dispatch, getState) => {
    dispatch(eventPollActions.disabledError());
  };

export const fetchPreviousBackstageChatMessages =
  (sessionId) => async (dispatch, getState) => {
    try {
      console.log(sessionId);

      let res = await fetch(`${BaseURL}getPreviousBackstageMsg/${sessionId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        sessionChatActions.FetchBackstageChats({
          backstageChats: res.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const fetchPreviousSessionChatMessages =
  (sessionId) => async (dispatch, getState) => {
    dispatch(sessionChatActions.startLoading());
    try {
      console.log(sessionId);

      let res = await fetch(`${BaseURL}getPreviousSessionMsg/${sessionId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        sessionChatActions.FetchSessionChats({
          sessionChats: res.data,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
export const errorTrackerForFetchPreviousSessionChatMessages =
  () => async (dispatch, getState) => {
    dispatch(sessionChatActions.disabledError());
  };

export const fetchPreviousEventAlerts =
  (eventId) => async (dispatch, getState) => {
    dispatch(eventAlertActions.startLoading());
    try {
      console.log(eventId);

      let res = await fetch(`${BaseURL}getPreviousEventAlert/${eventId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        eventAlertActions.FetchEventAlerts({
          eventAlerts: res.data.alerts,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
export const errorTrackerForFetchPreviousEventAlerts =
  () => async (dispatch, getState) => {
    dispatch(eventAlertActions.disabledError());
  };

export const getRTCTokenAndSession =
  (sessionId, channel, role, eventId, communityId) =>
  async (dispatch, getState) => {
    dispatch(RTCActions.startLoading());

    const fetchingRTCToken = async () => {
      let res = await fetch(`${BaseURL}getLiveStreamingTokenAndSession`, {
        method: "POST",
        body: JSON.stringify({
          channelId: channel,
          sessionId: sessionId,
          role: role,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      return res;
    };
    try {
      let res = await fetchingRTCToken();

      dispatch(
        RTCActions.fetchRTCToken({
          token: res.token,
        })
      );

      dispatch(
        sessionActions.FetchSession({
          session: res.session,
        })
      );
      history.push(
        `/community/${communityId}/event/${eventId}/hosting-platform/session/${sessionId}`
      );
    } catch (err) {
      dispatch(showSnackbar("error", "Failed to get token, Please try again."));
      dispatch(RTCActions.hasError(err.message));
    }
  };

export const fetchLiveStageTokenAndStartStreaming =
  (
    userId,
    channel,
    sessionId,
    startLiveStream,
    setShowTimer,
    resetPreviousStateRef
  ) =>
  async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}getLiveStageToken`, {
        method: "POST",
        body: JSON.stringify({
          channelId: channel,
          sessionId: sessionId,
          role: "host",
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      console.log(res.token);

      dispatch(
        RTCActions.fetchRTCToken({
          token: res.token,
        })
      );

      dispatch(
        sessionActions.FetchSession({
          session: res.session,
        })
      );

      // Do cleanup and start live stage stream

      setShowTimer(false);

      resetPreviousStateRef();

      startLiveStream(channel, res.token);
    } catch (error) {
      console.log(error);
    }
  };

export const fetchBackstageTokenAndStartStreaming =
  (userId, channel, sessionId, startLiveStream, setShowPauseTimer) =>
  async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}getBackstageToken`, {
        method: "POST",
        body: JSON.stringify({
          channelId: channel,
          sessionId: sessionId,
          role: "host",
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      console.log(res.token);

      dispatch(
        RTCActions.fetchRTCToken({
          token: res.token,
        })
      );

      dispatch(
        sessionActions.FetchSession({
          session: res.session,
        })
      );

      setShowPauseTimer(false);
      startLiveStream(channel, res.token);
    } catch (error) {
      console.log(error);
    }
  };

export const getRTCTokenForJoiningTable =
  (tableId, userId, launchTableScreen) => async (dispatch, getState) => {
    dispatch(RTCActions.startLoading());

    const fetchingRTCToken = async () => {
      let res = await fetch(`${BaseURL}getLiveStreamingTokenForJoiningTable`, {
        method: "POST",
        body: JSON.stringify({
          tableId: tableId,
          userId: userId,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      return res;
    };
    try {
      let res = await fetchingRTCToken();
      console.log(res);

      dispatch(
        RTCActions.fetchRTCToken({
          token: res.token,
        })
      );

      launchTableScreen();
    } catch (err) {
      console.log(err);
      dispatch(showSnackbar("error", "Failed to get token, Please try again."));
      dispatch(RTCActions.hasError(err.message));
    }
  };

export const getRTCTokenForJoiningBoothTable =
  (tableId, userId, launchTableScreen) => async (dispatch, getState) => {
    dispatch(RTCActions.startLoading());
    try {
      let res = await fetch(`${BaseURL}getTokenForBoothTable`, {
        method: "POST",
        body: JSON.stringify({
          tableId: tableId,
          userId: userId,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(
        RTCActions.fetchRTCToken({
          token: res.token,
        })
      );

      launchTableScreen();
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("error", "Failed to get token, Please try again."));
      dispatch(RTCActions.hasError(error.message));
    }
  };

export const getRTCTokenForNetworking =
  (handleOpen) => async (dispatch, getState) => {
    dispatch(RTCActions.startLoading());

    try {
      let res = await fetch(`${BaseURL}getLiveStreamingTokenForNetworking`, {
        method: "POST",
        body: JSON.stringify({
          roomId: getState().networking.networkingRoom,
          userId: getState().eventAccessToken.id,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      console.log(res);

      dispatch(
        RTCActions.fetchRTCToken({
          token: res.token,
        })
      );

      handleOpen();

      dispatch(
        networkingActions.SetOpenConfirmation({
          openState: false,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(RTCActions.hasError(error.message));

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to join networking. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const getRTCTokenForScreenShare =
  (sessionId, uid, startPresenting) =>
  async (dispatch, getState) => {
    dispatch(RTCActions.startLoading());

    const fetchingRTCToken = async () => {
      let res = await fetch(`${BaseURL}getLiveStreamingTokenForScreenShare`, {
        method: "POST",
        body: JSON.stringify({
          channel: sessionId,
          sessionId: sessionId,
          uid: `screen-${uid}`,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      return res;
    };
    try {
      let res = await fetchingRTCToken();
      console.log(res);

      dispatch(
        RTCActions.fetchRTCScreenToken({
          ScreenToken: res.token,
        })
      );

      startPresenting(res.token, `screen-${uid}`);
    } catch (err) {
      console.log(err);
      dispatch(RTCActions.hasError(err.message));
      dispatch(
        showSnackbar("error", "Failed to share screen, Please try again.")
      );
    }
  };

export const getRTCTokenForNetworkingScreenShare =
  (tableId, uid, startPresenting) => async (dispatch, getState) => {
    try {
      dispatch(RTCActions.startLoading());

      let res = await fetch(`${BaseURL}getTokenForBoothScreenShare`, {
        method: "POST",
        body: JSON.stringify({
          channel: tableId,
          uid: `screen-${uid}`,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(
        RTCActions.fetchRTCScreenToken({
          ScreenToken: res.token,
        })
      );

      startPresenting(res.token, `screen-${uid}`);
    } catch (error) {
      console.log(error);
      dispatch(RTCActions.hasError(error.message));
      dispatch(
        showSnackbar("error", "Failed to share screen, Please try again.")
      );
    }
  };

export const getRTCTokenForLoungeScreenShare =
  (tableId, uid, startPresenting) => async (dispatch, getState) => {
    try {
      dispatch(RTCActions.startLoading());

      let res = await fetch(`${BaseURL}getTokenForBoothScreenShare`, {
        method: "POST",
        body: JSON.stringify({
          channel: tableId,
          uid: `screen-${uid}`,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(
        RTCActions.fetchRTCScreenToken({
          ScreenToken: res.token,
        })
      );

      startPresenting(res.token, `screen-${uid}`);
    } catch (error) {
      console.log(error);
      dispatch(RTCActions.hasError(error.message));
      dispatch(
        showSnackbar("error", "Failed to share screen, Please try again.")
      );
    }
  };

export const getRTCTokenForBoothScreenShare =
  (tableId, uid, startPresenting) => async (dispatch, getState) => {
    try {
      dispatch(RTCActions.startLoading());

      let res = await fetch(`${BaseURL}getTokenForBoothScreenShare`, {
        method: "POST",
        body: JSON.stringify({
          channel: tableId,
          uid: `screen-${uid}`,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(
        RTCActions.fetchRTCScreenToken({
          ScreenToken: res.token,
        })
      );

      startPresenting(res.token, `screen-${uid}`);
    } catch (error) {
      console.log(error);
      dispatch(RTCActions.hasError(error.message));
      dispatch(
        showSnackbar("error", "Failed to share screen, Please try again.")
      );
    }
  };

export const getRTCTokenForNonUser =
  (sessionId, role, eventId, communityId, userId) =>
  async (dispatch, getState) => {
    dispatch(RTCActions.startLoading());

    const fetchingRTCToken = async () => {
      let res = await fetch(`${BaseURL}getLiveStreamingTokenForNonUser`, {
        method: "POST",
        body: JSON.stringify({
          sessionId: sessionId,
          role: role,
          userId: userId,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();
      return res;
    };

    try {
      let res = await fetchingRTCToken();
      console.log(res);

      dispatch(
        RTCActions.fetchRTCToken({
          token: res.token,
        })
      );

      history.push(
        `/community/${communityId}/event/${eventId}/hosting-platform/session/${sessionId}`
      );
    } catch (err) {
      alert(err);
      dispatch(RTCActions.hasError(err.message));
    }
  };

export const errorTrackerForFetchingRTCToken =
  () => async (dispatch, getState) => {
    dispatch(RTCActions.disabledError());
  };
export const resetAuthError = () => async (dispatch, getState) => {
  dispatch(authActions.ResetError());
};

export const resetUserError = () => async (dispatch, getState) => {
  dispatch(userActions.ResetError());
};

export const resetCommunityError = () => async (dispatch, getState) => {
  dispatch(communityActions.ResetError());
};

export const createDemoRequest = (formValues) => async (dispatch, getState) => {
  dispatch(demoActions.startLoading());
  try {
    let res = await fetch(`${BaseURL}demo/requestDemo`, {
      method: "POST",

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res.data);

    dispatch(
      demoActions.CreateDemo({
        demo: res.data,
      })
    );

    setTimeout(function () {
      dispatch(demoActions.disableSucceded());
    }, 4000);

    dispatch(
      showSnackbar(
        "success",
        "We have recieved your request and we will be in touch very soon."
      )
    );
  } catch (err) {
    dispatch(demoActions.hasError(err.message));
    dispatch(
      showSnackbar("error", "Failed to submit your request, Please try again.")
    );
  }
};

export const errorTrackerForCreateDemo = () => async (dispatch, getState) => {
  dispatch(demoActions.disabledError());
};

export const signupForEmailNewsletter =
  (email) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}newsletter/signUpViaEmail`, {
        method: "POST",

        body: JSON.stringify({
          email: email,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      dispatch(
        showSnackbar("success", "Ok, We will send you our newsletters.")
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar(
          "error",
          "Failed to subscribe to newsletter. Please try again."
        )
      );
    }
  };

export const contactUs = (formValues) => async (dispatch, getState) => {
  dispatch(contactUsActions.startLoading());
  try {
    let res = await fetch(`${BaseURL}contactUs/contact`, {
      method: "POST",

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res.data);

    dispatch(contactUsActions.ContactUs());

    dispatch(
      showSnackbar(
        "success",
        "We have recieved your ticket. We will be in touch soon."
      )
    );
  } catch (err) {
    dispatch(
      showSnackbar("error", "Failed to submit your ticket. Please try again.")
    );
    dispatch(contactUsActions.hasError(err.message));
    console.log(err);
  }
};

export const errorTrackerForContactUs = () => async (dispatch, getState) => {
  dispatch(contactUsActions.disabledError());
};

export const generatePayoutLink =
  ({ communityId, communityName, phoneNumber, email, amount }) =>
  async (dispatch) => {
    const reqBody = {
      account_number: "HbV3YvH7Zo0cDj",
      contact: {
        name: communityName,
        type: "customer",
        contact: phoneNumber,
        email: email,
      },
      amount: amount * 100,
      currency: "INR",
      purpose: "payout",
      description: `Payout link for ${communityName}`,
      send_sms: true,
      send_email: true,
      receipt: "Recipet for Payout",
      notes: {
        communityId: communityId,
        payout_amount: amount,
      },
    };

    const authToken = btoa("rzp_live_bDVAURs4oXxSGi:TFitnOVh9eOIFK3qdZsfCLfQ");

    try {
      let res = await fetch(`https://api.razorpay.com/v1/payout-links`, {
        method: "POST",

        body: JSON.stringify(reqBody),

        headers: {
          "Content-Type": "application/json",

          Authorization: `Basic ${authToken}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res.token);
    } catch (e) {
      console.log(e);
    }
  };

export const fundTransferRequest =
  (formValues) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}fund/transferRequest`, {
        method: "POST",

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res.data);

      alert(
        "Your fund transfer request is recieved successfully! Please check your email."
      );
    } catch (err) {
      console.log(err);
    }
  };

export const switchToFreePlan = (communityId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}communityPlan/switchToFree`, {
      method: "POST",

      body: JSON.stringify({
        communityId: communityId,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res.data);

    alert("Successfully switched to free plan!");
  } catch (err) {
    console.log(err);
  }
};

export const addNewAffiliate = (formValues) => async (dispatch, getState) => {
  dispatch(affiliateActions.startLoading());
  try {
    let res = await fetch(`${BaseURL}affiliate/createNewAffiliate`, {
      method: "POST",

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res.data);

    alert("Successfully added new affiliate!");

    dispatch(
      affiliateActions.CreateAffiliate({
        affiliate: res.data,
      })
    );
  } catch (err) {
    dispatch(affiliateActions.hasError(err.message));
    console.log(err);
  }
};

export const fetchEventAffiliates = (eventId) => async (dispatch, getState) => {
  dispatch(affiliateActions.startLoading());
  try {
    let res = await fetch(`${BaseURL}events/getAffliates/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      affiliateActions.FetchAffiliates({
        affiliates: res.data.affiliates,
      })
    );
  } catch (err) {
    dispatch(affiliateActions.hasError(err.message));
    console.log(err);
  }
};

export const captureUserInterestInEvent =
  (eventId) => async (dispatch, getState) => {
    // dispatch(affiliateActions.startLoading());
    try {
      let res = await fetch(
        `${BaseURL}interestedPeople/captureInterest/${eventId}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

export const fetchInterestedPeopleList =
  (eventId) => async (dispatch, getState) => {
    dispatch(interestedPeopleActions.startLoading());
    try {
      let res = await fetch(
        `${BaseURL}interestedPeople/fetchInterestedPeople/${eventId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        interestedPeopleActions.FetchInterestedPeople({
          interestedPeople: res.data,
        })
      );
    } catch (err) {
      dispatch(interestedPeopleActions.hasError(err.message));
      console.log(err);
    }
  };

export const fetchAvailableForNetworking =
  (eventId, id) => async (dispatch, getState) => {
    // dispatch(interestedPeopleActions.startLoading());
    try {
      let res = await fetch(`${BaseURL}availableForNetworking/${eventId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        availableForNetworkingActions.FetchAvailablePeople({
          availablePeople: res.data,
        })
      );
    } catch (err) {
      dispatch(availableForNetworkingActions.hasError(err.message));
      console.log(err);
    }
  };

export const createNewEventMsg = (newMsg) => async (dispatch, getState) => {
  dispatch(
    eventChatActions.CreateEventChat({
      chat: newMsg,
    })
  );
};
export const createNewEventAlert = (newAlert) => async (dispatch, getState) => {
  dispatch(
    eventAlertActions.CreateEventAlert({
      eventAlert: newAlert,
    })
  );
};

export const createNewEventPoll = (newPoll) => async (dispatch, getState) => {
  dispatch(
    eventPollActions.CreateEventPoll({
      eventPoll: newPoll,
    })
  );
};

export const updateEventPoll = (poll) => async (dispatch, getState) => {
  dispatch(
    eventPollActions.UpdateEventPoll({
      updatedPoll: poll,
    })
  );
};

export const createNewSessionMsg = (newMsg) => async (dispatch, getState) => {
  dispatch(
    sessionChatActions.CreateSessionChat({
      chat: newMsg,
    })
  );
};

export const createNewBackstageMsg = (newMsg) => async (dispatch, getState) => {
  dispatch(
    sessionChatActions.CreateBackstageChat({
      chat: newMsg,
    })
  );
};

export const MailChimpAuth = (code) => async (dispatch) => {
  try {
    await eureka.get(`/oauth/mailchimp/callback/?code=${code}`);
  } catch (err) {
    console.log(err);
  }
};

export const DuplicateUserSignOut =
  (userId, message) => async (dispatch, getState) => {
    console.log(userId, "hey hitting duplicate user sign out");
    console.log(getState().user.userDetails._id);

    if (userId === getState().user.userDetails._id) {
      console.log(message);
      alert(message);
      window.localStorage.clear();

      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            clientId:
              "438235916836-6oaj1fbnqqrcd9ba30348fbe2ebn6lt0.apps.googleusercontent.com",
            scope: "profile email",
          })
          .then(() => {
            window.gapi.auth2.getAuthInstance().signOut();

            // this.onAuthChange(this.auth.isSignedIn.get());
            // this.auth.isSignedIn.listen(this.onAuthChange);
          });
      });

      dispatch(authActions.SignOut());
      dispatch(communityAuthActions.CommunitySignOut());

      setTimeout(function () {
        dispatch(authActions.disabledSignOutSucceded());
      }, 4000);

      history.push("/home");

      //TODO Home page
    }
  };

export const eventRegistrationSignIn =
  (eventId) => async (dispatch, getState) => {
    dispatch(
      authActions.signinForEventRegistration({
        eventId,
      })
    );
  };

export const eventBuyingPlan = (intent) => async (dispatch, getState) => {
  dispatch(
    authActions.signinForBuyingPlan({
      intent,
    })
  );
};
export const fetchMailChimpAudiences =
  (eventId) => async (dispatch, getState) => {
    dispatch(communityActions.startLoading());
    try {
      console.log(eventId, "i am counting on you eventID index.js ");
      const mailChimpAudienceList = await eureka.get(
        `/eureka/v1/fetchMailChimpAudiences/?eventId=${eventId}`
      );
      console.log(mailChimpAudienceList.data);

      dispatch(
        communityActions.FetchMailChimpAudiences({
          mailChimpAudiences: mailChimpAudienceList.data,
        })
      );
    } catch (err) {
      dispatch(communityActions.hasError(err.message));
      // console.log(err);
    }
  };

export const errorTrackerForFetchMailChimpAudiences =
  () => async (dispatch, getState) => {
    dispatch(communityActions.disabledError());
  };

export const getPayPalConnectLink = () => async (dispatch, getState) => {
  fetch(`${BaseURL}paypal/getPayPalAccessToken`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const payPalRes = await res.json();
    console.log(payPalRes);

    dispatch(
      paypalActions.FetchLink({
        link: payPalRes.data.links[1].href,
      })
    );

    // window.location.href = payPalRes.data.links[1].href;
  });
};

export const getCommunityTawkLink =
  (communityId) => async (dispatch, getState) => {
    dispatch(tawkActions.startLoading());
    try {
      const res = await fetch(`${BaseURL}getTawkLink/${communityId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      console.log(result);
      dispatch(
        tawkActions.UpdateTawkLink({
          link: result.data.tawkLink,
        })
      );
    } catch (err) {
      dispatch(tawkActions.hasError(err.message));
    }
  };

export const getEventbriteOrganisations =
  (privateToken) => async (dispatch, getState) => {
    dispatch(eventbriteActions.startLoading());
    try {
      const res = await fetch(
        `https://www.eventbriteapi.com/v3/users/me/organizations/`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${privateToken}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      console.log(result);
      dispatch(
        eventbriteActions.UpdateOrganisationList({
          organizations: result.organizations,
        })
      );
    } catch (error) {
      dispatch(eventbriteActions.hasError(error.message));
    }
  };

export const getEventbriteEventsByOrganisation =
  (privateToken, orgId) => async (dispatch, getState) => {
    dispatch(eventbriteActions.startLoading());

    try {
      const res = await fetch(
        `https://www.eventbriteapi.com/v3/organizations/${orgId}/events/`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${privateToken}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      console.log(result);

      dispatch(
        eventbriteActions.UpdateEventsList({
          events: result.events,
        })
      );
    } catch (error) {
      dispatch(eventbriteActions.hasError(error.message));
    }
  };

export const createEventbriteWebhookForEventRegistrations =
  (privateToken, orgId, eventId, bluemeetEventId) =>
  async (dispatch, getState) => {
    dispatch(eventbriteActions.startLoading());

    try {
      const res = await fetch(
        `https://www.eventbriteapi.com/v3/organizations/${orgId}/webhooks/`,
        {
          method: "POST",

          body: JSON.stringify({
            endpoint_url: `https://api.bluemeet.in/api-eureka/api/eureka/v1/eventbrite_registration/${orgId}/${eventId}/${bluemeetEventId}`,
            actions: "order.placed",
            event_id: eventId,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${privateToken}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      await fetch(`${BaseURL}events/saveEventbriteConf/${bluemeetEventId}`, {
        method: "PATCH",

        body: JSON.stringify({
          eventbriteOrganisation: orgId,
          eventbriteEvent: eventId,
          eventbriteWebhookData: result,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const SaveResult = await res.json();
      console.log(SaveResult);

      console.log("Successfully configured eventbrite integration.");

      console.log(result);

      dispatch(
        eventbriteActions.UpdateWebhook({
          webhookData: result,
        })
      );
    } catch (error) {
      dispatch(eventbriteActions.hasError(error.message));
    }
  };

export const saveEventbriteConfigurationForEvent =
  (bluemeetEventId, orgId, eventId, webhookData) =>
  async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}event/saveEventbriteConf/${bluemeetEventId}`,
        {
          method: "PATCH",

          body: JSON.stringify({
            eventbriteOrganisation: orgId,
            eventbriteEvent: eventId,
            eventbriteWebhookData: webhookData,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();
      console.log(result);

      console.log("Successfully configured eventbrite integration.");
    } catch (error) {
      console.log("error saving eventbrite configuration to database");
    }
  };

export const generateAPICredentials =
  (communityId, userId, label) => async (dispatch, getState) => {
    dispatch(apiKeyActions.startLoading());
    try {
      // Submit a request to generate new set of API Key and secret
      const res = await fetch(
        `${BaseURL}community/generateApiKey/${communityId}`,
        {
          method: "POST",

          body: JSON.stringify({
            userId: userId,
            label: label,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();
      console.log(result);

      dispatch(
        apiKeyActions.CreateApiKey({
          apiKey: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(apiKeyActions.hasError(error.message));
    }
  };

export const fetchApiKeys = (communityId) => async (dispatch, getState) => {
  dispatch(apiKeyActions.startLoading());

  try {
    const res = await fetch(`${BaseURL}community/getApiKeys/${communityId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();
    console.log(result);

    dispatch(
      apiKeyActions.FetchApiKeys({
        apiKeys: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(apiKeyActions.hasError(error.message));

    dispatch(
      showSnackbar(
        "error",
        "Failed to fetch API credentials, Please try again."
      )
    );
  }
};

export const updateAPIKey = (id, enabled) => async (dispatch, getState) => {
  try {
    const res = await fetch(
      `${BaseURL}community/updateApiKey/${id}/${enabled}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      }
    );

    const result = await res.json();

    dispatch(
      apiKeyActions.UpdateApiKey({
        apiKey: result.data,
      })
    );

    dispatch(showSnackbar("success", "Api Credential updated successfully!"));
  } catch (error) {
    console.log(error);

    dispatch(
      showSnackbar(
        "error",
        "Failed to update API credential, Please try again."
      )
    );
  }
};

export const deleteAPIKey = (id) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}community/deleteApiKey/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      apiKeyActions.FetchApiKeys({
        apiKeys: result.data,
      })
    );

    dispatch(showSnackbar("success", "API Credential deleted successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar(
        "error",
        "Failed to delete API credential, Please try again."
      )
    );
  }
};

export const getStripeConnectAccountStatus =
  (userId, communityId, accountId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}stripe/getStripeConnectStatus/${accountId}/${communityId}`,
        {
          method: "POST",

          body: JSON.stringify({
            communityId: communityId,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      const result = await res.json();
      console.log(result);

      if (result.charges_enabled && result.details_submitted) {
        window.location.href = `/onboarded-successfully/user/${userId}/community/${communityId}/account/${accountId}`;
      }
      if (!result.charges_enabled && !result.details_submitted) {
        window.location.href = `/not-onboarded-yet/user/${userId}/community/${communityId}/account/${accountId}`;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const createNewRole =
  (formValues, communityId, userId, roleTitle) =>
  async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}role/createNewRole/${communityId}/${userId}`,
        {
          method: "POST",

          body: JSON.stringify({
            communityId: communityId,
            userId: userId,
            roleTitle: roleTitle,
            capabilities: { ...formValues },
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      const result = await res.json();
      console.log(result);

      //  Dispatch in roles slice in redux store
    } catch (error) {
      console.log(error);
    }
  };

export const editRoleCapabilities =
  (formValues, roleId, communityId, userId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}role/editRoleCapabilities/${communityId}/${userId}/${roleId}`,
        {
          method: "PATCH",

          body: JSON.stringify({
            communityId: communityId,
            roleId: roleId,
            userId: userId,
            capabilities: { ...formValues },
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      const result = await res.json();
      console.log(result);

      //  Dispatch in roles slice in redux store
    } catch (error) {
      console.log(error);
    }
  };

export const deleteRole =
  (roleId, communityId, userId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}role/deleteRole/${communityId}/${userId}/${roleId}`,
        {
          method: "DELETE",

          body: JSON.stringify({
            communityId: communityId,
            roleId: roleId,
            userId: userId,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      const result = await res.json();
      console.log(result);

      //  Dispatch in roles slice in redux store
    } catch (error) {
      console.log(error);
    }
  };

export const fetchRoles = (communityId) => async (dispatch, getState) => {
  console.log("I reached in fetch roles");
  try {
    const res = await fetch(`${BaseURL}role/getRoles/${communityId}/`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    const result = await res.json();
    console.log(result);

    dispatch(
      roleActions.FetchRoles({
        roles: result.roles,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const uploadVideoForCommunity =
  (communityId, file, handleClose) => async (dispatch, getState) => {
    try {
      const key = `${communityId}/${UUID()}.mp4`;

      s3.getSignedUrl(
        "putObject",
        {
          Bucket: "bluemeet-inc",
          Key: key,
          ContentType: "video/mp4",
        },
        async (err, presignedURL) => {
          await uploadS3(presignedURL, file, (percent) => {
            dispatch(
              communityActions.SetUploadPercent({
                percent: percent * 1 > 1.2 ? (percent * 1).toFixed(1) : 1.2,
              })
            );
          });

          try {
            // Save this video info in community document.
            const res = await fetch(`${BaseURL}community/uploadVideo/`, {
              method: "POST",

              body: JSON.stringify({
                fileName: file.name,
                key: key,
              }),

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().communityAuth.token}`,
              },
            });

            const result = await res.json();

            dispatch(
              videoActions.UploadVideo({
                video: result.video,
              })
            );

            handleClose();

            dispatch(
              showSnackbar(
                "success",
                "Video file uploaded successfully! Make sure to link it to an event."
              )
            );
          } catch (error) {
            console.log(error);

            dispatch(
              showSnackbar("error", "Failed to upload video, Please try again.")
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to upload video, Please try again.")
      );
    }
  };

export const uploadVideoForEvent =
  (eventId, file, handleClose) => async (dispatch, getState) => {
    try {
      const key = `${eventId}/${UUID()}.mp4`;

      s3.getSignedUrl(
        "putObject",
        {
          Bucket: "bluemeet-inc",
          Key: key,
          ContentType: "video/mp4",
        },
        async (err, presignedURL) => {
          await uploadS3(presignedURL, file, (percent) => {
            dispatch(
              eventActions.SetVideoUploadPercent({
                percent: percent * 1 > 1.2 ? (percent * 1).toFixed(1) : 1.2,
              })
            );
          });

          try {
            // Save this video info in event document.

            const res = await fetch(`${BaseURL}events/uploadVideo/`, {
              method: "POST",

              body: JSON.stringify({
                fileName: file.name,
                eventId: eventId,
                key: key,
              }),

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().communityAuth.token}`,
              },
            });

            const result = await res.json();
            console.log(result, "This is the result of new uploaded video.");

            dispatch(
              eventVideoActions.UploadVideo({
                video: result.video,
              })
            );

            dispatch(
              snackbarActions.openSnackBar({
                message: "Video uploaded successfully!",
                severity: "success",
              })
            );

            handleClose();

            setTimeout(function () {
              dispatch(snackbarActions.closeSnackBar());
            }, 6000);
          } catch (error) {
            console.log(error);
            dispatch(
              showSnackbar("error", "Failed to upload video, Please try again.")
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to upload video, Please try again.")
      );
    }
  };

export const deleteEventVideo = (videoId) => async (dispatch, getState) => {
  try {
    console.log(videoId);
    let res = await fetch(`${BaseURL}events/deleteVideo`, {
      method: "DELETE",

      body: JSON.stringify({
        videoId: videoId,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();

    dispatch(
      eventVideoActions.DeleteVideo({
        videoId: videoId,
      })
    );
    console.log(res);

    dispatch(showSnackbar("success", "Video Deleted successfully!"));
  } catch (error) {
    console.log(error);
    showSnackbar("error", "Failed to delete video, Please try again.");
  }
};

export const unlinkVideo =
  (videoId, eventId, handleClose) => async (dispatch, getState) => {
    console.log(videoId, eventId);
    try {
      const res = await fetch(`${BaseURL}unlinkVideo`, {
        method: "POST",

        body: JSON.stringify({
          videoId: videoId,
          eventId: eventId,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      const result = await res.json();
      console.log(result);

      dispatch(
        eventVideoActions.FetchVideos({
          videos: result.videos,
        })
      );

      handleClose();

      dispatch(showSnackbar("success", "Video Unlinked successfully!"));
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to unlink video, Please try again.")
      );
    }
  };

export const linkVideo =
  (videoId, eventId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}linkVideo`, {
        method: "POST",

        body: JSON.stringify({
          videoId: videoId,
          eventId: eventId,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      const result = await res.json();
      console.info(result);

      // alert("We have recieved result");

      dispatch(showSnackbar("success", "Video linked successfully!"));

      dispatch(
        eventVideoActions.FetchVideos({
          videos: result.videos,
        })
      );

      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to link video, Please try again.")
      );
    }
  };

export const fetchEventVideos = (eventId) => async (dispatch, getState) => {
  try {
    console.log(eventId);
    let res = await fetch(`${BaseURL}fetchEventVideos`, {
      method: "POST",

      body: JSON.stringify({
        eventId: eventId,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      eventVideoActions.FetchVideos({
        videos: res.videos,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const acceptInvitation =
  (invitationId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}team-invites/accept-invitation/${invitationId}/`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

export const fetchPendingInvitations =
  (communityId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}team-invites/fetchPendingInvitations/`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      const result = await res.json();
      console.log(result);

      dispatch(
        communityActions.FetchInvitations({
          invitations: result.pendingInvitations,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const fetchCommunityManagers =
  (communityId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}team-invites/fetchCommunityManagers/`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      const result = await res.json();
      console.log(result);

      dispatch(
        communityActions.FetchCommunityManagers({
          communityManagers: result.communityManagers.eventManagers,
        })
      );
    } catch (error) {
      console.log(error);

      dispatch(
        showSnackbar("error", "Failed to fetch team members, Please try again.")
      );
    }
  };

export const getSuperAdmin = (communityId) => async (dispatch, getState) => {
  try {
    const res = await fetch(
      `${BaseURL}team-invites/getSuperAdmin/${communityId}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      }
    );

    const result = await res.json();
    console.log(result);

    dispatch(
      communityActions.FetchSuperAdmin({
        superAdmin: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to fetch super admin, Please try again.")
    );
  }
};

export const removeFromTeam =
  (email, communityId, status) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}team-invites/removeFromTeam/${email}/${status}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      const result = await res.json();
      console.log(result);

      dispatch(
        communityActions.RemoveCommunityManager({
          email: email,
          status: status,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Successfully removed from community team.",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to remove from community team. Please try again.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const updateCommunity =
  (id, formValues, file) => async (dispatch, getState) => {
    const key = `${id}/${UUID()}.jpeg`;

    if (file) {
      s3.getSignedUrl(
        "putObject",
        {
          Bucket: "bluemeet-inc",
          Key: key,
          ContentType: "image/jpeg",
        },

        async (err, presignedURL) => {
          const awsRes = await fetch(presignedURL, {
            method: "PUT",

            body: file,

            headers: {
              "Content-Type": file.type,
            },
          });

          console.log(awsRes);

          if (awsRes.status === 200) {
            dispatch(communityActions.startLoading());

            try {
              const res = await fetch(
                `${BaseURL}community/${id}/updateCommunity`,
                {
                  method: "PATCH",
                  body: JSON.stringify({
                    ...formValues,
                    image: key,
                  }),

                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().communityAuth.token}`,
                  },
                }
              );
              if (!res.ok) {
                if (!res.message) {
                  throw new Error("Something went wrong");
                } else {
                  throw new Error(res.message);
                }
              }
              const result = await res.json();

              console.log(result);
              dispatch(
                communityActions.EditCommunity({
                  community: result.data,
                })
              );

              dispatch(
                snackbarActions.openSnackBar({
                  message: "Community details updated successfully",
                  severity: "success",
                })
              );

              setTimeout(function () {
                dispatch(snackbarActions.closeSnackBar());
              }, 6000);
            } catch (err) {
              dispatch(communityActions.hasError(err.message));

              dispatch(
                snackbarActions.openSnackBar({
                  message: "Failed to update community.",
                  severity: "error",
                })
              );
              setTimeout(function () {
                dispatch(snackbarActions.closeSnackBar());
              }, 4000);
            }
          }
        }
      );
    } else {
      dispatch(communityActions.startLoading());
      try {
        const res = await fetch(`${BaseURL}community/${id}/updateCommunity`, {
          method: "PATCH",
          body: JSON.stringify({
            ...formValues,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        });
        if (!res.ok) {
          if (!res.message) {
            throw new Error("Something went wrong");
          } else {
            throw new Error(res.message);
          }
        }
        const result = await res.json();

        console.log(result);
        dispatch(
          communityActions.EditCommunity({
            community: result.data,
          })
        );

        dispatch(
          snackbarActions.openSnackBar({
            message: "Community details updated successfully!",
            severity: "success",
          })
        );

        setTimeout(function () {
          dispatch(snackbarActions.closeSnackBar());
        }, 6000);
      } catch (error) {
        dispatch(communityActions.hasError(error.message));

        dispatch(
          snackbarActions.openSnackBar({
            message: "Failed to update community.",
            severity: "error",
          })
        );
        setTimeout(function () {
          dispatch(snackbarActions.closeSnackBar());
        }, 4000);
      }
    }
  };

export const editRegistrationForm =
  (formValues, eventId) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}events/${eventId}/updateRegistrationForm`,

        {
          method: "PATCH",
          body: JSON.stringify({
            ...formValues,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      dispatch(
        eventActions.EditEvent({
          event: res.data.updatedEvent,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Event updated successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(eventActions.hasError(error.message));

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update event.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const updateRegistration =
  (formValues, registrationId) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}registrations/updateRegistration/${registrationId}`,

        {
          method: "PATCH",
          body: JSON.stringify({
            ...formValues,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res);

      // ! Dispatch updated registration

      dispatch(
        registrationActions.UpdateRegistration({
          registration: res.data,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Permissions update successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update event profile.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const updateRegistrationSettings =
  (formValues, registrationId) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}registrations/updateRegistrationSettings/${registrationId}`,

        {
          method: "PATCH",
          body: JSON.stringify({
            ...formValues,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res);

      // ! Dispatch updated registration

      dispatch(
        registrationActions.UpdateRegistration({
          registration: res.data,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Settings updated successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update notification settings.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const sendSpeakerInvitation =
  (name, email, speakerId, invitationLink, sessions) =>
  async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}speakers/${speakerId}/sendInvitation`,

        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            invitationLink: invitationLink,
            sessions: sessions,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res.data, "op");

      dispatch(
        speakerActions.EditSpeaker({
          speaker: res.data,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Invitation sent successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      dispatch(
        snackbarActions.openSnackBar({
          message: "Sending invitation failed. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const sendBoothInvitation = (boothId) => async (dispatch, getState) => {
  try {
    let res = await fetch(
      `${BaseURL}booths/${boothId}/sendBoothInvitation`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      }
    );

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();

    dispatch(
      snackbarActions.openSnackBar({
        message: "Invitation sent successfully!",
        severity: "success",
      })
    );

    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  } catch (error) {
    dispatch(
      snackbarActions.openSnackBar({
        message: "Sending invitation failed. Please try again later.",
        severity: "error",
      })
    );

    setTimeout(function () {
      dispatch(snackbarActions.closeSnackBar());
    }, 6000);
  }
};

export const sendAttendeeInvite =
  (registrationId) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}registrations/sendInvite/${registrationId}`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      dispatch(
        snackbarActions.openSnackBar({
          message: "Invitation sent successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Sending invitation failed. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const sendBulkAttendeeEmail =
  (infoObject) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}registrations/sendBulkInvite`, {
        method: "POST",

        body: JSON.stringify(infoObject),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      dispatch(
        snackbarActions.openSnackBar({
          message: "Invitation sent successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Sending invitation failed. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const sendBulkSpeakerEmail =
  (infoObject, eventId) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}speakers/sendBulkInvite/:eventId`, {
        method: "POST",

        body: JSON.stringify(infoObject),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      dispatch(
        snackbarActions.openSnackBar({
          message: "Invitation sent successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Sending invitation failed. Please try again later.",
          severity: "error",
        })
      );

      setTimeout(function () {
        dispatch(snackbarActions.closeSnackBar());
      }, 6000);
    }
  };

export const setEntryRestriction =
  (entryRestriction) => async (dispatch, getState) => {
    console.log(entryRestriction);
    dispatch(
      sessionRestrictionActions.EditRestriction({
        entryRestriction: entryRestriction,
      })
    );
  };

export const setPermittedTickets =
  (permittedTickets) => async (dispatch, getState) => {
    dispatch(
      sessionRestrictionActions.EditPermittedTickets({
        permittedTickets: permittedTickets,
      })
    );
  };

export const setPermittedPeople =
  (permittedPeople) => async (dispatch, getState) => {
    console.log(permittedPeople);
    dispatch(
      sessionRestrictionActions.EditPermittedPeople({
        permittedPeople: permittedPeople,
      })
    );
  };

export const getCommunityVideos =
  (communityId) => async (dispatch, getState) => {
    try {
      console.log(communityId);
      let res = await fetch(`${BaseURL}community/getCommunityVideo`, {
        method: "POST",

        body: JSON.stringify({
          communityId: communityId,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        videoActions.FetchVideos({
          videos: res.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const getEventVideos = (eventId) => async (dispatch, getState) => {
  try {
    console.log(eventId);

    let res = await fetch(`${BaseURL}community/getEventVideo`, {
      method: "POST",

      body: JSON.stringify({
        eventId: eventId,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();

    dispatch(
      videoActions.FetchVideos({
        videos: res.data,
      })
    );

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideo = (videoId) => async (dispatch, getState) => {
  try {
    console.log(videoId);
    let res = await fetch(`${BaseURL}community/deleteVideo`, {
      method: "DELETE",

      body: JSON.stringify({
        videoId: videoId,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();

    dispatch(
      videoActions.DeleteVideo({
        videoId: videoId,
      })
    );

    dispatch(showSnackbar("success", "Video deleted successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to delete video, Please try again.")
    );
  }
};

export const LinkCommunityVideoToEvent =
  (eventId, videoId) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}community/updateVideo`, {
        method: "PATCH",

        body: JSON.stringify({
          eventId: eventId,
          videoId: videoId,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

export const addVibe =
  (file, eventId, name, handleClose) => async (dispatch, getState) => {
    try {
      const key = `${eventId}/${UUID()}.jpeg`;

      s3.getSignedUrl(
        "putObject",
        {
          Bucket: "bluemeet-inc",
          Key: key,
          ContentType: "image/jpeg",
        },
        async (err, presignedURL) => {
          await uploadS3(presignedURL, file, (percent) => {
            dispatch(
              vibeActions.SetUploadPercent({
                percent: percent * 1 > 1.2 ? (percent * 1).toFixed(1) : 1.2,
              })
            );
          });

          try {
            let res = await fetch(`${BaseURL}events/addVibe/${eventId}`, {
              method: "POST",

              body: JSON.stringify({
                eventId: eventId,
                name: name,
                key: key,
              }),

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().communityAuth.token}`,
              },
            });

            if (!res.ok) {
              if (!res.message) {
                throw new Error("Something went wrong");
              } else {
                throw new Error(res.message);
              }
            }
            res = await res.json();
            console.log(res);

            dispatch(
              vibeActions.UploadVibe({
                vibe: res.data,
              })
            );

            dispatch(
              snackbarActions.openSnackBar({
                message: "Vibe uploaded successfully!",
                severity: "success",
              })
            );

            handleClose();

            setTimeout(function () {
              dispatch(snackbarActions.closeSnackBar());
            }, 6000);
          } catch (error) {
            eventActions.hasError(error.message);
            console.log(error);

            dispatch(
              snackbarActions.openSnackBar({
                message: "Failed to upload vibe image, Please try again.",
                severity: "error",
              })
            );
            setTimeout(function () {
              dispatch(snackbarActions.closeSnackBar());
            }, 4000);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

export const getVibes = (eventId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}events/getVibes/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();

    dispatch(
      vibeActions.FetchVibes({
        vibes: res.data,
      })
    );

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVibe = (vibeId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}events/deleteVibe/${vibeId}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();

    dispatch(
      vibeActions.DeleteVibe({
        vibeId: vibeId,
      })
    );

    console.log(res);

    dispatch(showSnackbar("success", "Vibe deleted successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to delete vibe, Please try again."));
  }
};

export const setVibeToPreview = (imgURL) => async (dispatch, getState) => {
  try {
    dispatch(
      vibeActions.SetVibeToPreview({
        imgURL: imgURL,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

// Create RTMP stream destination

export const createRTMPDestination =
  (formValues, eventId, handleClose) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}createRTMPDestination/${eventId}`, {
        method: "POST",

        body: JSON.stringify({ ...formValues }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res.data);
      // * Confirmed that res.data is the stream destination object
      //* Make Slice and actions and then dispatch it in global redux store.

      dispatch(
        StreamDestinationActions.CreateStreamDestination({
          streamDestination: res.data,
        })
      );
      dispatch(
        snackbarActions.openSnackBar({
          message: "Stream destination added successfully!",
          severity: "success",
        })
      );
      setTimeout(function () {
        closeSnackbar();
      }, 6000);

      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(
        snackbarActions.openSnackBar({
          message:
            "Failed to create stream destination. Please try again later!",
          severity: "success",
        })
      );
      setTimeout(function () {
        closeSnackbar();
      }, 6000);
      handleClose();
    }
  };

// Fetch streamDestinations

export const fetchStreamDestinations =
  (eventId) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}getRTMPDestinations/${eventId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res.data);

      dispatch(
        StreamDestinationActions.FetchStreamDestinations({
          streamDestinations: res.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

// Fetch streamDestination

export const fetchOneStreamDestination =
  (destinationId) => async (dispatch, getState) => {
    console.log("This fxn was called.");
    try {
      let res = await fetch(
        `${BaseURL}getOneStreamDestination/${destinationId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res.data);

      dispatch(
        StreamDestinationActions.FetchStreamDestination({
          streamDestination: res.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

// Update streamDestination

export const updateStreamDestination =
  (destinationId, formValues) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}updateStreamDestination/${destinationId}`,
        {
          method: "PATCH",

          body: JSON.stringify({ ...formValues }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res.data);

      dispatch(
        StreamDestinationActions.UpdateStreamDestination({
          streamDestination: res.data,
        })
      );

      dispatch(showSnackbar("success", "Stream destination updated!"));
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar(
          "error",
          "Failed to update stream destination, please try again."
        )
      );
    }
  };

// Delete streamDestination

export const deleteStreamDestination =
  (destinationId) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}deleteStreamDestination/${destinationId}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res);

      dispatch(
        StreamDestinationActions.DeleteStreamDestination({
          destinationId: destinationId,
        })
      );
      dispatch(
        showSnackbar("success", "Stream destination deleted successfully!")
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar(
          "error",
          "Failed to delete stream destination, Please try again."
        )
      );
    }
  };

export const setCurrentMailTemplate =
  (mailId) => async (dispatch, getState) => {
    dispatch(
      mailActions.SetCurrentMail({
        mail: mailId,
      })
    );
  };

// Create Mail

export const createMail =
  (formValues, eventId, handleClose) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}mail/createNewMail/${eventId}`, {
        method: "POST",

        body: JSON.stringify({ ...formValues }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res);

      dispatch(
        mailActions.CreateMail({
          mail: res.data,
        })
      );

      handleClose();

      dispatch(showSnackbar("success", "New mail added successfully!"));
    } catch (error) {
      console.log(error);

      dispatch(
        showSnackbar("error", "Failed to create mail, Please try again.")
      );
    }
  };

// Get Mails

export const fetchMails = (eventId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}mail/getMails/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();

    console.log(res);

    dispatch(
      mailActions.FetchMails({
        mails: res.data,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(
      showSnackbar("error", "Failed to fetch mails. Please try again later.")
    );
  }
};

// Get one mail details

export const getOneMail = (mailId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}mail/getMailDetails/${mailId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();

    console.log(res);

    dispatch(
      mailActions.FetchMail({
        mail: res.data,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(
      showSnackbar(
        "error",
        "Failed to fetch mail details. Please try again later!"
      )
    );
  }
};

// Update mail

export const updateMail =
  (formValues, mailId, handleClose) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}mail/updateMail/${mailId}`, {
        method: "PATCH",

        body: JSON.stringify({ ...formValues }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res);

      dispatch(
        mailActions.UpdateMail({
          mail: res.data,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Mail saved successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);

      handleClose();

      // window.location.reload();
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to update mail. Please try again later!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);

      handleClose();

      // window.location.reload();
    }
  };

// Delete mail

export const deleteMail =
  (mailId, handleClose) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}mail/deleteMail/${mailId}`, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res);

      dispatch(
        mailActions.DeleteMail({
          deletedMailId: mailId,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Successfully deleted mail!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);

      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to delete mail, Please try again later.")
      );
    }
  };

// Send mail

export const SendMail = (mailId, recepients) => async (dispatch, getState) => {
  //  recepients will be an array of emails to which email will be sent
  try {
    let res = await fetch(`${BaseURL}mail/sendMail/${mailId}`, {
      method: "POST",

      body: JSON.stringify({
        recepients: recepients,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();

    console.log(res);

    dispatch(
      mailActions.UpdateMail({
        mail: res.data,
      })
    );

    dispatch(
      snackbarActions.openSnackBar({
        message: "Mail sent successfully!",
        severity: "success",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  } catch (error) {
    console.log(error);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to send mail. Please try again later!",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};

// Send test mail

export const sendTestMail =
  (mailId, recieverMail, handleClose) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}mail/sendTestMail/${mailId}`, {
        method: "POST",

        body: JSON.stringify({
          recieverMail: recieverMail,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();

      console.log(res);

      // Show snackbar that test mail has been sent successfully.

      dispatch(
        snackbarActions.openSnackBar({
          message: "Test mail sent successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);

      handleClose();
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to send test mail. Please try again.",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
      handleClose();
    }
  };

export const fetchCodes = () => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}getCodes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    res = await res.json();
    console.log(res);

    dispatch(
      communityActions.FetchCodes({
        codes: res.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch codes!",
        severity: "success",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};

export const redeemCodes =
  (communityId, userId, codes) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}redeemAppSumoCode`, {
        method: "POST",

        body: JSON.stringify({
          communityId: communityId,
          userId: userId,
          codes: codes,
        }),

        headers: {
          Authorization: `Bearer ${getState().communityAuth.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        communityActions.EditCommunity({
          community: res.data,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Successfully redeemed codes.",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to redeem codes. Invalid or used codes.",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const resetProgress = () => async (dispatch, getState) => {
  try {
    dispatch(
      communityActions.SetUploadPercent({
        percent: 0,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const resetEventVideoUploadProgress =
  () => async (dispatch, getState) => {
    try {
      dispatch(
        eventActions.SetVideoUploadPercent({
          percent: 0,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const resetEventVibeUploadProgress =
  () => async (dispatch, getState) => {
    try {
      dispatch(
        vibeActions.SetUploadPercent({
          percent: 0,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const fetchCommunityTransactions =
  (communityId) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}getCommunityTransactions/${communityId}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${getState().communityAuth.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      res = await res.json();
      console.log(res);

      dispatch(
        communityActions.FetchTransactions({
          transactions: res.data,
        })
      );
    } catch (error) {
      console.log(error);

      // Show snack bar that failed to fetch transactions.
    }
  };

export const connectMailchimp =
  (code, communityId, userId) => async (dispatch, getState) => {
    try {
      const res = await eureka.get(
        `/eureka/v1/oauth/mailchimp/callback/?code=${code}&communityId=${communityId}`
      );
      const updatedCommunity = res.data;

      dispatch(
        communityActions.EditCommunity({
          community: updatedCommunity,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Mailchimp connected successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);

      history.push(`/user/${userId}/community/integrations/${communityId}`);
    } catch (error) {
      console.log(error);
      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to connect mailchimp. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const connectSalesforce =
  (code, communityId, userId) => async (dispatch, getState) => {
    try {
      const res = await eureka.get(
        `/eureka/v1/oauth/salesforce/callback/?code=${code}&communityId=${communityId}`
      );
      const updatedCommunity = res.data;

      dispatch(
        communityActions.EditCommunity({
          community: updatedCommunity,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Salesforce connected successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);

      history.push(`/user/${userId}/community/integrations/${communityId}`);
    } catch (error) {
      console.log(error);
      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to connect salesforce. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const disconnectMailchimp =
  (communityId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}community/disconnectMailchimp/${communityId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      console.log(result);

      dispatch(
        communityActions.EditCommunity({
          community: result.data,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Mailchimp uninstalled successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to disconnect mailchimp. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const disconnectSalesforce =
  (communityId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}community/disconnectSalesforce/${communityId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      console.log(result);

      dispatch(
        communityActions.EditCommunity({
          community: result.data,
        })
      );

      dispatch(
        snackbarActions.openSnackBar({
          message: "Salesforce uninstalled successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to disconnect salesforce. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const requestIntegration =
  (formValues) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}requestIntegration`, {
        method: "POST",

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      console.log(result);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Integration request recieved successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to submit integration request. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const buildWithBluemeet =
  (formValues, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}buildWithBluemeet`, {
        method: "POST",

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      handleClose();
      console.log(result);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Integration request recieved successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to submit integration request. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const startSessionRecording =
  (sessionId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}startSessionRecording/${sessionId}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      handleClose();
      console.log(result);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Session recording started successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to start recording. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const stopSessionRecording =
  (sessionId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}stopSessionRecording/${sessionId}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      handleClose();
      console.log(result);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Session recording stopped successfully!",
          severity: "success",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to stop recording. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const fetchEventSpeakers = (eventId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}getEventSpeakers/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();
    console.log(result);

    dispatch(
      speakerActions.FetchSpeakers({
        speakers: result.data,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch speakers. Please try again!",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};

export const getPeopleInEvent = (eventId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}getPeopleInEvent/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();
    console.log(result);

    dispatch(
      userActions.FetchPeopleInEvent({
        peopleInThisEvent: result.data.currentlyInEvent,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch people in this event. Please try again!",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};

export const setPersonalChatConfig = (id) => async (dispatch, getState) => {
  try {
    dispatch(
      personalChatActions.EditPersonalChat({
        id: id,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to set personal chat configuration. Please try again!",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};

export const getMyAllPersonalMessages =
  (userId) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}getMyAllPersonalChatMsg/${userId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();
      console.log(result);

      dispatch(
        personalChatActions.FetchChats({
          chats: result.data,
        })
      );
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to fetch personal messages. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const createNewPersonalMessage =
  (chat) => async (dispatch, getState) => {
    dispatch(
      personalChatActions.UpdateChats({
        chat: chat,
      })
    );
  };

export const fetchInvitationDetails =
  (invitationId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}fetchInvitationDetails/${invitationId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();
      console.log(result);

      dispatch(
        teamInvitationActions.FetchInvitationDetails({
          invitationDetails: result.data,
        })
      );
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to fetch invitation details. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const getUserRegistrations = () => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}users/getUserRegistrations`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();
    console.log(result);

    dispatch(
      registrationActions.FetchRegistrations({
        registrations: result.data.registrations,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch user registrations. Please try again!",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};

export const fetchEventForMagicLinkPage =
  (registrationId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}getEventDetailsForMagicLinkPage/${registrationId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      // Inside result we get data(eventDetails) userId (userToBeLoggedIn)
      // and userRole (role of user in event)

      if (result.notFound) {
        // Registration doc was not found

        history.push("/does-not-exist");
      } else {
        // Normal case => Registration doc was found.

        dispatch(
          magicLinkActions.FetchEventDetails({
            event: result.data,
          })
        );
        dispatch(
          magicLinkActions.FetchUserId({
            userId: result.userId,
          })
        );
        dispatch(
          magicLinkActions.FetchUserRole({
            userRole: result.userRole,
          })
        );
        dispatch(
          magicLinkActions.FetchUserEmail({
            userEmail: result.userEmail,
          })
        );
      }
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message: "Failed to fetch event details. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const fetchSpeakerRegistrationInfo =
  (registrationId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}getSpeakerRegistrationInfoForMagicLinkPage/${registrationId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      // Check if speaker is registered on Bluemeet or not

      if (result.userIsOnBluemeet) {
        if (result.notFound) {
          // Registration doc was not found
          history.push("/does-not-exist");
        } else {
          // Normal case => Registration doc was found.

          // user is registered on Bluemeet Platform

          dispatch(
            magicLinkActions.FetchEventDetails({
              event: result.data,
            })
          );
          dispatch(
            magicLinkActions.FetchUserId({
              userId: result.userId,
            })
          );
          dispatch(
            magicLinkActions.FetchUserRole({
              userRole: result.userRole,
            })
          );
          dispatch(
            magicLinkActions.FetchUserEmail({
              userEmail: result.userEmail,
            })
          );
          dispatch(
            magicLinkActions.FetchUserIsOnBluemeet({
              userIsOnBluemeet: result.userIsOnBluemeet,
            })
          );
        }
      } else {
        // user is not registered on Bluemeet Platform

        if (result.notFound) {
          // Registration doc was not found

          history.push("/does-not-exist");
        } else {
          // Normal case => Registration doc was found.

          dispatch(
            magicLinkActions.FetchEventDetails({
              event: result.data,
            })
          );
          dispatch(
            magicLinkActions.FetchUserRole({
              userRole: result.userRole,
            })
          );
          dispatch(
            magicLinkActions.FetchUserEmail({
              userEmail: result.userEmail,
            })
          );
          dispatch(
            magicLinkActions.FetchUserIsOnBluemeet({
              userIsOnBluemeet: result.userIsOnBluemeet,
            })
          );
        }
      }

      // Inside result we get data(eventDetails) and if this speaker is registered on Bluemeet platform as a user or not if he / she is on Bluemeet platform than we will get his / her name, emai, userId
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message:
            "Failed to fetch speaker registration info details. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const fetchExhibitorRegistrationInfo =
  (registrationId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}getExhibitorRegistrationInfoForMagicLinkPage/${registrationId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();
      console.log(
        result,
        "This is the result of exhibitor visiting magic link page."
      );

      // Check if exhibitor is registered on Bluemeet or not

      if (result.userIsOnBluemeet) {
        // user is registered on Bluemeet Platform

        if (result.notFound) {
          // Registration doc was not found

          history.push("/does-not-exist");
        } else {
          // Normal case => Registration document was found

          dispatch(
            magicLinkActions.FetchEventDetails({
              event: result.data,
            })
          );
          dispatch(
            magicLinkActions.FetchUserId({
              userId: result.userId,
            })
          );
          dispatch(
            magicLinkActions.FetchUserRole({
              userRole: result.userRole,
            })
          );
          dispatch(
            magicLinkActions.FetchUserEmail({
              userEmail: result.userEmail,
            })
          );
          dispatch(
            magicLinkActions.FetchUserIsOnBluemeet({
              userIsOnBluemeet: result.userIsOnBluemeet,
            })
          );
        }
      } else {
        // user is not registered on Bluemeet Platform

        if (result.notFound) {
          // Registration doc was not found

          history.push("/does-not-exist");
        } else {
          // Normal case => Registration document was found

          dispatch(
            magicLinkActions.FetchEventDetails({
              event: result.data,
            })
          );
          dispatch(
            magicLinkActions.FetchUserRole({
              userRole: result.userRole,
            })
          );
          dispatch(
            magicLinkActions.FetchUserEmail({
              userEmail: result.userEmail,
            })
          );
          dispatch(
            magicLinkActions.FetchUserIsOnBluemeet({
              userIsOnBluemeet: result.userIsOnBluemeet,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);

      dispatch(
        snackbarActions.openSnackBar({
          message:
            "Failed to fetch exhibitor registration info details. Please try again!",
          severity: "error",
        })
      );

      setTimeout(function () {
        closeSnackbar();
      }, 6000);
    }
  };

export const logInMagicLinkUser = (userId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}users/loginMagicLinkUser/${userId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();
    console.log(result);

    dispatch(
      authActions.SignIn({
        token: result.token,
        referralCode: result.data.user.hasUsedAnyReferral
          ? null
          : result.data.user.referralCode,
      })
    );
    dispatch(
      userActions.CreateUser({
        user: result.data.user,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to log in. Please try again!",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};

export const fetchBoothTableChats = (tableId) => async (dispatch, getState) => {
  try {
    // Write logic to fetch all table chats for this booth table

    const res = await fetch(`${BaseURL}getBoothTableChats/${tableId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();
    console.log(result);

    dispatch(
      boothChairsActions.FetchBoothTableChats({
        tableChats: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to fetch chats, Please try again."));
  }
};

export const fetchBoothChats = (boothId) => async (dispatch, getState) => {
  try {
    // Write logic to fetch all booth area chats for this booth

    const res = await fetch(`${BaseURL}getBoothChats/${boothId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();
    console.log(result);

    dispatch(
      boothActions.FetchBoothChats({
        chats: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to fetch chats, Please try again."));
  }
};

export const fetchTableChats = (tableId) => async (dispatch, getState) => {
  try {
    // Write logic to fetch all table chats for this table

    const res = await fetch(`${BaseURL}getTableChats/${tableId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();
    console.log(result);

    dispatch(
      roomsActions.FetchTableChats({
        chats: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to fetch chats, Please try again."));
  }
};

export const editTable =
  (title, tableId, file, priority) => async (dispatch, getState) => {
    try {
      const key = `${tableId}/${UUID()}.jpeg`;

      if (file) {
        s3.getSignedUrl(
          "putObject",
          { Bucket: "bluemeet-inc", Key: key, ContentType: "image/jpeg" },
          async (err, presignedURL) => {
            const awsRes = await fetch(presignedURL, {
              method: "PUT",

              body: file,

              headers: {
                "Content-Type": file.type,
              },
            });

            console.log(awsRes);

            const res = await fetch(`${BaseURL}editTable/${tableId}`, {
              method: "POST",

              body: JSON.stringify({
                title: title,
                image: key,
                priority: priority,
              }),

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
              },
            });

            if (!res.ok) {
              if (!res.message) {
                throw new Error("Something went wrong");
              } else {
                throw new Error(res.message);
              }
            }

            const result = await res.json();
            console.log(result);

            dispatch(
              eventTablesActions.UpdateEventTable({
                table: result.data,
              })
            );

            dispatch(
              showSnackbar("success", "Room details updated successfully!")
            );
          }
        );
      } else {
        const res = await fetch(`${BaseURL}editTable/${tableId}`, {
          method: "POST",

          body: JSON.stringify({
            title: title,
            priority: priority,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });

        if (!res.ok) {
          if (!res.message) {
            throw new Error("Something went wrong");
          } else {
            throw new Error(res.message);
          }
        }

        const result = await res.json();
        console.log(result);

        dispatch(
          eventTablesActions.UpdateEventTable({
            table: result.data,
          })
        );

        dispatch(showSnackbar("success", "Room Details updated successfully!"));
      }
    } catch (error) {
      console.log(error);

      dispatch(
        showSnackbar("error", "Failed to update room, Please try again.")
      );
    }
  };

export const editBoothTable =
  (title, tableId, file, priority) => async (dispatch, getState) => {
    try {
      if (file) {
        const key = `${tableId}/${UUID()}.${file.type}`;

        s3.getSignedUrl(
          "putObject",
          { Bucket: "bluemeet-inc", Key: key, ContentType: "image/jpeg" },
          async (err, presignedURL) => {
            const awsRes = await fetch(presignedURL, {
              method: "PUT",

              body: file,

              headers: {
                "Content-Type": file.type,
              },
            });

            const res = await fetch(`${BaseURL}editBoothTable/${tableId}`, {
              method: "POST",

              body: JSON.stringify({
                title: title,
                image: key,
                priority: priority,
              }),

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
              },
            });

            if (!res.ok) {
              if (!res.message) {
                throw new Error("Something went wrong");
              } else {
                throw new Error(res.message);
              }
            }

            const result = await res.json();
            console.log(result);

            dispatch(
              boothTablesActions.UpdateBoothTable({
                table: result.data,
              })
            );

            dispatch(
              showSnackbar("success", "Room details updated successfully!")
            );
          }
        );
      } else {
        const res = await fetch(`${BaseURL}editBoothTable/${tableId}`, {
          method: "POST",

          body: JSON.stringify({
            title: title,
            priority: priority,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });

        if (!res.ok) {
          if (!res.message) {
            throw new Error("Something went wrong");
          } else {
            throw new Error(res.message);
          }
        }

        const result = await res.json();
        console.log(result);

        dispatch(
          boothTablesActions.UpdateBoothTable({
            table: result.data,
          })
        );

        dispatch(showSnackbar("success", "Room Details updated successfully!"));
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to update room, Please try again.")
      );
    }
  };

export const getEventTables = (eventId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}getEventTables/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();

    dispatch(
      eventTablesActions.FetchEventTables({
        eventTables: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to get Rooms, Please try again!"));
  }
};

export const getEventTable = (tableId) => async (dispatch, getState) => {
  dispatch(eventTablesActions.startLoading());
  try {
    const res = await fetch(`${BaseURL}getTableDetails/${tableId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();

    dispatch(
      eventTablesActions.FetchEventTable({
        eventTable: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      eventTablesActions.hasError(
        "Failed to fetch Room Details, Please try again."
      )
    );

    dispatch(
      showSnackbar("error", "Failed to fetch Room Details, Please try again.")
    );
  }
};

export const getBoothTables = (boothId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}getBoothTables/${boothId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();

    dispatch(
      boothTablesActions.FetchBoothTables({
        boothTables: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to fetch Rooms, Please try again."));
  }
};

export const getBoothTable = (tableId) => async (dispatch, getState) => {
  dispatch(boothTablesActions.startLoading());
  try {
    const res = await fetch(`${BaseURL}getBoothTableDetails/${tableId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    const result = await res.json();

    dispatch(
      boothTablesActions.FetchBoothTable({
        boothTable: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to fetch Room Details, Please try again.")
    );
  }
};

export const fetchBoothTableDetails =
  (boothTable) => async (dispatch, getState) => {
    dispatch(
      boothTablesActions.FetchBoothTable({
        boothTable: boothTable,
      })
    );
  };

export const fetchLoungeTableDetails =
  (table) => async (dispatch, getState) => {
    dispatch(
      eventTablesActions.FetchEventTable({
        eventTable: table,
      })
    );
  };

export const fetchVolumeIndicators = (arr) => async (dispatch, getState) => {
  dispatch(StreamingActions.fetchVolumeIndicators({ volumeIndicators: arr }));
};

export const updateSpeakingVolumeIndicators =
  (volume) => async (dispatch, getState) => {
    dispatch(
      StreamingActions.updateSpeakingVolumeIndicators({ volume: volume })
    );
  };

export const updateNonSpeakingVolumeIndicators =
  (volume) => async (dispatch, getState) => {
    dispatch(
      StreamingActions.updateNonSpeakingVolumeIndicators({ volume: volume })
    );
  };

export const setLocalVolumeLevel = (level) => async (dispatch, getState) => {
  dispatch(StreamingActions.setLocalVolumeLevel({ localVolumeLevel: level }));
};

export const setVenueRightDrawerSelectedTab =
  (tab) => async (dispatch, getState) => {
    dispatch(
      SelectedTabActions.setVenueRightDrawerSelectedTab({
        tab: tab,
      })
    );
  };

export const setChatSelectedTab = (tab) => async (dispatch, getState) => {
  dispatch(
    SelectedTabActions.setChatSelectedTab({
      tab: tab,
    })
  );
};

export const setOpenVenueRightDrawer =
  (openState) => async (dispatch, getState) => {
    dispatch(
      SelectedTabActions.setOpenVenueRightDrawer({
        openState: openState,
      })
    );
  };

export const createNewConnectionRequest =
  (newConnetionRequest) => async (dispatch, getState) => {
    dispatch(
      connectionsActions.AddToConnection({
        connection: newConnetionRequest,
      })
    );
  };

export const createNewScheduledMeet =
  (scheduledMeet) => async (dispatch, getState) => {
    dispatch(
      scheduledMeetActions.AddScheduledMeet({
        scheduledMeet: scheduledMeet,
      })
    );
  };

export const fetchMyConnections = () => async (dispatch, getState) => {
  try {
    let res = await fetch(
      `${BaseURL}users/fetchConnections`,

      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );

    console.log(res);
    if (!res.ok) {
      if (!res.message) {
        throw new Error("fetching user connections failed");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    dispatch(
      connectionsActions.FetchConnections({
        connections: res.data,
      })
    );
  } catch (error) {
    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch connections. Please try again!",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};

export const fetchMyMeetings = (meetings) => async (dispatch, getState) => {
  console.log(meetings, "These are my meeting");
  dispatch(
    scheduledMeetActions.FetchScheduledMeets({
      scheduledMeets: meetings,
    })
  );
};

export const setOpenMatching = (openState) => async (dispatch, getState) => {
  dispatch(
    networkingActions.SetOpenMatching({
      openState: openState,
    })
  );
};

export const setOpenConfirmation =
  (openState) => async (dispatch, getState) => {
    dispatch(
      networkingActions.SetOpenConfirmation({
        openState: openState,
      })
    );
  };

export const setOpenNetworkingTable =
  (openState) => async (dispatch, getState) => {
    dispatch(
      networkingActions.SetOpenNetworkingTable({
        openState: openState,
      })
    );
  };

export const setNetworkingRoom = (roomId) => async (dispatch, getState) => {
  dispatch(
    networkingActions.SetNetworkingRoom({
      networkingRoom: roomId,
    })
  );
};

export const setMatchedWith = (matchedWith) => async (dispatch, getState) => {
  dispatch(
    networkingActions.SetMatchedWith({
      matchedWith: matchedWith,
    })
  );
};

export const setNetworkingChats =
  (networkingChats) => async (dispatch, getState) => {
    dispatch(
      networkingActions.SetNetworkingChats({
        networkingChats: networkingChats,
      })
    );
  };

export const createNewNetworkingMsg =
  (newMsg) => async (dispatch, getState) => {
    dispatch(
      networkingActions.CreateNewNetworkingMsg({
        newMsg: newMsg,
      })
    );
  };

export const deleteNetworkingMsg =
  (deletedMsg) => async (dispatch, getState) => {
    dispatch(
      networkingActions.DeleteNetworkingMsg({
        deletedMsg: deletedMsg,
      })
    );
  };

export const setOpenAudioVideoSettings =
  (openState) => async (dispatch, getState) => {
    dispatch(
      SelectedTabActions.setOpenAudioAndVideoSettings({
        openState: openState,
      })
    );
  };

export const setOpenScheduleMeeting =
  (openState) => async (dispatch, getState) => {
    dispatch(
      SelectedTabActions.setOpenScheduleMeeting({
        openState: openState,
      })
    );
  };

export const setScheduleMeetingUserId =
  (userId) => async (dispatch, getState) => {
    dispatch(
      SelectedTabActions.setScheduleMeetingUserId({
        userId: userId,
      })
    );
  };

export const fetchSessionQnA = (sessionId) => async (dispatch, getState) => {
  try {
    let res = await fetch(
      `${BaseURL}getSessionQnA/${sessionId}`,

      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );

    console.log(res);
    if (!res.ok) {
      if (!res.message) {
        throw new Error("fetching session QnA failed");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    dispatch(
      sessionQnAActions.FetchSessionQnAs({
        qnas: res.data,
      })
    );
  } catch (err) {
    console.log(err);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch QnAs. Please try again!",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};

export const createSessionQnA = (qna) => async (dispatch, getState) => {
  dispatch(
    sessionQnAActions.CreateSessionQnA({
      qna: qna,
    })
  );
};

export const updateSessionQnA = (qna) => async (dispatch, getState) => {
  dispatch(
    sessionQnAActions.UpdateSessionQnA({
      qna: qna,
    })
  );
};

export const fetchSessionQnAs = (qnas) => async (dispatch, getState) => {
  dispatch(
    sessionQnAActions.FetchSessionQnAs({
      qnas: qnas,
    })
  );
};

export const fetchSessionPolls = (sessionId) => async (dispatch, getState) => {
  try {
    let res = await fetch(
      `${BaseURL}getSessionPolls/${sessionId}`,

      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );

    console.log(res);
    if (!res.ok) {
      if (!res.message) {
        throw new Error("fetching session QnA failed");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    dispatch(
      sessionPollActions.FetchSessionPolls({
        polls: res.data,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(
      snackbarActions.openSnackBar({
        message: "Failed to fetch Polls. Please try again!",
        severity: "error",
      })
    );

    setTimeout(function () {
      closeSnackbar();
    }, 6000);
  }
};

export const createSessionPoll = (poll) => async (dispatch, getState) => {
  dispatch(
    sessionPollActions.CreateSessionPolls({
      poll: poll,
    })
  );
};

export const updateSessionPoll = (poll) => async (dispatch, getState) => {
  dispatch(
    sessionPollActions.UpdateSessionPoll({
      poll: poll,
    })
  );
};

export const fetchUpdatedSessionPolls =
  (polls) => async (dispatch, getState) => {
    dispatch(
      sessionPollActions.FetchSessionPolls({
        polls: polls,
      })
    );
  };

export const updateUsersInSession = (users) => async (dispatch, getState) => {
  dispatch(
    userActions.FetchPeopleInSession({
      users: users,
    })
  );
};

export const updateSession = (session) => async (dispatch, getState) => {
  dispatch(
    sessionActions.EditSession({
      session: session,
    })
  );
};

export const sendStageReminder =
  (sessionId, userId, msg, setMsg, handleClose) =>
  async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}sendStageReminder/${sessionId}/${userId}/${msg}`,

        {
          method: "POST",

          body: JSON.stringify({
            sessionId: sessionId,
            userId: userId,
            msg: msg,
          }),

          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Failed to send reminder. Please try again.");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(showSnackbar("success", "Reminder sent successfully!"));
      handleClose();
      setMsg("");
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to send reminder. Please try again.")
      );
    }
  };

export const switchOffMediaBeforeTransition =
  () => async (dispatch, getState) => {
    dispatch(sessionActions.SwitchOffMedia());
  };

export const deactivateUser = (userId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}users/deactivateMe/${userId}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    dispatch(
      showSnackbar(
        "success",
        "Your account has been successfully deactivated. Please check your mail for more deatils."
      )
    );

    window.location.href = `/home`;
  } catch (error) {
    console.log(error);

    dispatch(
      showSnackbar(
        "error",
        "Failed to deactivate profile. Please try again later."
      )
    );
  }
};

export const setOpenCommunityVerificationNotice =
  (openState) => async (dispatch, getState) => {
    dispatch(
      userActions.SetCommunityVerificationOpenState({
        openState: openState,
      })
    );
  };

export const setCommunityVerificationId =
  (id) => async (dispatch, getState) => {
    dispatch(
      userActions.SetCommunityVerificationId({
        id: id,
      })
    );
  };

export const setCommunityVerificationEmail =
  (email) => async (dispatch, getState) => {
    dispatch(
      userActions.SetCommunityVerificationEmail({
        email: email,
      })
    );
  };

export const setUserVerificationEmail =
  (email) => async (dispatch, getState) => {
    dispatch(
      userActions.SetUserVerificationEmail({
        email: email,
      })
    );
  };

export const setCommunityVerificationSucceded =
  (state) => async (dispatch, getState) => {
    dispatch(
      userActions.SetCommunityVerificationSucceded({
        state: state,
      })
    );
  };

export const setCommunityVerificationLinkExpired =
  (status) => async (dispatch, getState) => {
    dispatch(
      userActions.SetCommunityVerificationLinkExpired({
        communityVerificationLinkStatus: status,
      })
    );
  };

export const setUserVerificationLinkExpired =
  (status) => async (dispatch, getState) => {
    dispatch(
      userActions.SetUserVerificationLinkExpired({
        userVerificationLinkStatus: status,
      })
    );
  };

export const verifyAndCreateCommunity = (id) => async (dispatch, getState) => {
  try {
    let res = await fetch(
      `${BaseURL}users/verifyAndCreateCommunity/${id}`,

      {
        method: "POST",
      }
    );

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Failed to verify community. Please try again.");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    if (res.expired) {
      // It has already expired
      dispatch(setCommunityVerificationLinkExpired(true));
    } else {
      // Community is verified and created => Please dispatch

      dispatch(
        communityActions.FetchCommunityRequests({
          communityRequests: res.communityAccountRequests,
        })
      );

      dispatch(
        authActions.SignIn({
          token: res.userToken,
        })
      );

      dispatch(
        communityAuthActions.CommunitySignIn({
          token: res.token,
        })
      );

      dispatch(
        communityActions.CreateCommunity({
          community: res.communityDoc,
        })
      );

      dispatch(navigationIndexForCommunityDash(0));

      // Dispatch that community verification succeded please refresh user dashboard to access your community

      dispatch(
        userActions.SetCommunityVerificationSucceded({
          state: true,
        })
      );

      // console.log(
      //   `/user/${res.userId}/community/getting-started/${res.communityDoc._id}`
      // );
      // window.location.href = `/user/${res.userId}/community/getting-started/${res.communityDoc._id}`;
    }
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to verify community. Please try again.")
    );
  }
};

export const resendCommunityVerificationMail =
  (id) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}resendCommunityVerificationMail/${id}`,

        {
          method: "POST",
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error(
            "Failed to send community verification mail. Please try again."
          );
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(showSnackbar("success", "Verification mail sent successfully!"));
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to send email, please try again.")
      );
    }
  };

export const resendUserVerificationEmail =
  (id) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}resendUserVerificationEmail/${id}`,

        {
          method: "POST",
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error(
            "Failed to send user verification mail. Please try again."
          );
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(showSnackbar("success", "verification mail sent successfully!"));
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to send email, please try again.")
      );
    }
  };

export const changeCommunityAccountRequestEmail =
  (id, email) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}changeCommunityAccountRequestEmail/${id}`,

        {
          method: "POST",

          body: JSON.stringify({
            email: email,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error(
            "Failed to send user verification mail. Please try again."
          );
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      if (res.alreadyUsedEmail) {
        dispatch(
          showSnackbar(
            "error",
            "This email is already registered on another community."
          )
        );
      } else {
        dispatch(
          communityActions.UpdateCommunityRequest({
            community: res.data,
          })
        );
        dispatch(
          showSnackbar("success", "Community email updated successfully!")
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to update email, please try again.")
      );
    }
  };

export const setReferralCode = (referralCode) => async (dispatch, getState) => {
  dispatch(
    userActions.SetReferralCode({
      referralCode: referralCode,
    })
  );
};

export const fetchLatestEvent = () => async (dispatch, getState) => {
  try {
    let res = await fetch(
      `${BaseURL}fetchLatestEvent`,

      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      }
    );

    if (!res.ok) {
      if (!res.message) {
        throw new Error(
          "Failed to fetch latest event please try reloading this page."
        );
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(
      eventActions.FetchLatestEvent({
        latestEvent: res.data,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(
      showSnackbar(
        "error",
        "Failed to fetch latest event please try reloading this page."
      )
    );
  }
};

export const createLatestEvent = (formValues) => async (dispatch, getState) => {
  try {
    let res = await fetch(
      `${BaseURL}community/events/createLatestEvent`,

      {
        method: "POST",
        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      }
    );
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Failed to create event please try again.");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(
      eventActions.FetchLatestEvent({
        latestEvent: res.data.event,
      })
    );

    dispatch(showSnackbar("success", "New event created successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to create event, please try again.")
    );
  }
};

export const toggleRequestDemo = (openState) => async (dispatch, getState) => {
  dispatch(
    openCloseActions.toggleRequestDemo({
      openState: openState,
    })
  );
};

export const resetCoverUploadPercent = () => async (dispatch, getState) => {
  dispatch(
    communityPageActions.FetchUploadPercent({
      percent: 0,
    })
  );
};

export const uploadCommunityCover =
  (file, communityId, handleClose) => async (dispatch, getState) => {
    try {
      const key = `${communityId}/${UUID()}.${file.type}`;

      s3.getSignedUrl(
        "putObject",
        { Bucket: "bluemeet-inc", Key: key, ContentType: "image/jpeg" },
        async (err, presignedURL) => {
          await uploadS3(presignedURL, file, (percent) => {
            dispatch(
              communityPageActions.FetchUploadPercent({
                percent: percent * 1 > 1.2 ? (percent * 1).toFixed(1) : 1.2,
              })
            );
          });

          try {
            // Edit community

            const res = await fetch(
              `${BaseURL}community/${communityId}/updateCommunityProfile`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  cover: key,
                }),

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getState().communityAuth.token}`,
                },
              }
            );
            if (!res.ok) {
              if (!res.message) {
                throw new Error("Something went wrong");
              } else {
                throw new Error(res.message);
              }
            }
            const result = await res.json();

            dispatch(
              communityPageActions.FetchCommunity({
                community: result.data,
              })
            );

            dispatch(
              communityPageActions.FetchUploadPercent({
                percent: 0,
              })
            );

            handleClose();

            dispatch(showSnackbar("success", "Cover updated successfully!"));
          } catch (error) {
            console.log(error);
            dispatch(
              showSnackbar("error", "Failed to update cover, Please try again.")
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to update cover, Please try again.")
      );
    }
  };

export const uploadEventBanner =
  (file, eventId, handleClose) => async (dispatch, getState) => {
    try {
      // Here we will get updated event

      const key = `${eventId}/${UUID()}.${file.type}`;

      s3.getSignedUrl(
        "putObject",
        { Bucket: "bluemeet-inc", Key: key, ContentType: "image/jpeg" },
        async (err, presignedURL) => {
          await uploadS3(presignedURL, file, (percent) => {
            dispatch(
              eventActions.FetchEventBannerUploadPercent({
                percent: percent * 1 > 1.2 ? (percent * 1).toFixed(1) : 1.2,
              })
            );
          });

          try {
            // Edit community

            const res = await fetch(
              `${BaseURL}events/${eventId}/updateEventBanner`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  banner: key,
                }),

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getState().communityAuth.token}`,
                },
              }
            );
            if (!res.ok) {
              if (!res.message) {
                throw new Error("Something went wrong");
              } else {
                throw new Error(res.message);
              }
            }
            const result = await res.json();

            dispatch(
              eventActions.FetchEvent({
                event: result.data,
              })
            );

            dispatch(
              eventActions.FetchEventBannerUploadPercent({
                percent: 0,
              })
            );

            handleClose();

            dispatch(
              showSnackbar("success", "Event Banner updated successfully!")
            );
          } catch (error) {
            console.log(error);
            dispatch(
              showSnackbar(
                "error",
                "Failed to update banner, Please try again."
              )
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Updating Event Banner failed, Please try again.")
      );
    }
  };

export const resetEventBannerUploadPercent =
  () => async (dispatch, getState) => {
    dispatch(
      eventActions.FetchEventBannerUploadPercent({
        percent: 0,
      })
    );
  };

export const followCommunity =
  (userId, communityId) => async (dispatch, getState) => {
    try {
      // Here we will get updated user

      const res = await fetch(
        `${BaseURL}community/${communityId}/followCommunity`,
        {
          method: "POST",

          body: JSON.stringify({
            communityId: communityId,
            userId: userId,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(
        userActions.CreateUser({
          user: result.data,
        })
      );

      dispatch(
        communityPageActions.FetchFollowers({
          followers: result.followers,
        })
      );

      dispatch(showSnackbar("success", "Started following this community."));
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to follow community, Please try again.")
      );
    }
  };

export const unfollowCommunity =
  (userId, communityId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}community/${communityId}/unfollowCommunity`,
        {
          method: "POST",

          body: JSON.stringify({
            communityId: communityId,
            userId: userId,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(
        userActions.CreateUser({
          user: result.data,
        })
      );

      dispatch(
        communityPageActions.FetchFollowers({
          followers: result.followers,
        })
      );

      dispatch(showSnackbar("success", "Unfollowed this community."));
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to unfollow community, Please try again.")
      );
    }
  };

export const fetchCommunityFollowers =
  (communityId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}community/${communityId}/getCommunityFollowers`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(
        communityPageActions.FetchFollowers({
          followers: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to fetch followers, Please try again"));
    }
  };

export const fetchCommunityProfile =
  (communityId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}community/${communityId}/getCommunityProfile`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(
        communityPageActions.FetchCommunity({
          community: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to fetch community, Please try again.")
      );
    }
  };

export const fetchCommunityEvents =
  (communityId) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}community/${communityId}/getEvents`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(
        communityPageActions.FetchEvents({
          events: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to fetch events, Please try again.")
      );
    }
  };

export const fetchCommunityReviews =
  (communityId) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}community/${communityId}/getReviews`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(
        communityPageActions.FetchReviews({
          reviews: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar(
          "error",
          "Failed to fetch community Reviews, Please try again."
        )
      );
    }
  };

export const setPaypalEmailVerificationSucceded =
  (succeded) => async (dispatch, getState) => {
    dispatch(
      communityActions.SetPayPalEmailVerificationSucceded({
        succeded: succeded,
      })
    );
  };

export const setPaypalEmailVerificationLinkExpired =
  (expired) => async (dispatch, getState) => {
    dispatch(
      communityActions.SetPayPalEmailVerificationLinkExpired({
        expired: expired,
      })
    );
  };

export const verifyPaypalEmail = (id) => async (dispatch, getState) => {
  try {
    // Here we need to take verificationId and verify it and return response accordingly
    const res = await fetch(`${BaseURL}verifyPayPalEmail/${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    const result = await res.json();

    if (result.expired) {
      // Email verification link has expired
      dispatch(
        communityActions.SetPayPalEmailVerificationLinkExpired({
          expired: true,
        })
      );
    } else {
      // Verified
      dispatch(
        communityActions.SetPayPalEmailVerificationSucceded({
          succeded: true,
        })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(
      communityActions.SetPayPalEmailVerificationSucceded({
        succeded: false,
      })
    );

    dispatch(
      showSnackbar("error", "Failed to verify email, Please try again.")
    );
  }
};

export const fetchPaypalPayouts =
  (communityId) => async (dispatch, getState) => {
    try {
      // Just go ahead and fetch payouts
      const res = await fetch(`${BaseURL}fetchPaypalPayouts/${communityId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      console.log(result.data);

      dispatch(
        communityActions.FetchPayouts({
          payouts: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to fetch payouts, Please try again.")
      );
    }
  };

export const createPayPalPayoutrequest =
  (communityId, email, amount) => async (dispatch, getState) => {
    try {
      // Just go ahead and create new PayPal Payout request

      const res = await fetch(
        `${BaseURL}createPayPalPayoutRequest/${communityId}`,
        {
          method: "POST",

          body: JSON.stringify({
            communityId: communityId,
            email: email,
            amount: amount,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      const result = await res.json();

      dispatch(
        communityActions.CreatePayout({
          payout: result.data,
        })
      );

      dispatch(
        showSnackbar(
          "success",
          "Please keep an eye on your email for confirmation."
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar(
          "error",
          "Failed to create payout request, Please try again."
        )
      );
    }
  };

export const editPaypalPayoutEmail =
  (communityId, email, handleClose) => async (dispatch, getState) => {
    try {
      // Create a request to change paypal email

      const res = await fetch(
        `${BaseURL}editPayPalPayoutEmail/${communityId}`,
        {
          method: "POST",

          body: JSON.stringify({
            communityId: communityId,
            email: email,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(
        communityActions.FetchCommunity({
          community: result.data,
        })
      );

      handleClose();

      dispatch(
        showSnackbar("success", "Please check provided email for verification.")
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to update email, Please try again.")
      );
    }
  };

export const resendPayPalPayoutEmailVerificationLink =
  (communityId) => async (dispatch, getState) => {
    try {
      // Resend mail for paypal payout
      const res = await fetch(
        `${BaseURL}resendPayPalEmailVerificationLink/${communityId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().communityAuth.token}`,
          },
        }
      );
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(showSnackbar("success", "Email sent successfully!"));
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to send Email, Please try again.")
      );
    }
  };

export const duplicateEvent = (eventId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}duplicateEvent/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    const result = await res.json();

    // dispatch newly created event

    dispatch(
      eventActions.CreateEvent({
        event: result.data,
      })
    );

    dispatch(showSnackbar("success", "Event duplicated successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to duplicate event, Please try again.")
    );
  }
};

export const fetchArchivedEvents =
  (communityId) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}getArchivedEvents/${communityId}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });
      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }
      const result = await res.json();

      dispatch(
        eventActions.FetchArchivedEvents({
          events: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to fetch archive list, Please try again.")
      );
    }
  };

export const fetchShowcaseEvents = () => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}getShowcaseEvents`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }
    const result = await res.json();

    dispatch(
      eventActions.FetchDemoEvents({
        events: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Cannot get Demo events, Please try again.")
    );
  }
};

export const fetchRegistrations = (eventId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}fetchRegistrations/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(
      registrationActions.FetchRegistrations({
        registrations: res.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to fetch registrations"));
  }
};

export const addTrack = (formValues, eventId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}track/createTrack/${eventId}`, {
      method: "POST",

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(
      eventActions.CreateTrack({
        track: res.data,
      })
    );

    dispatch(showSnackbar("success", "Track Created successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to add track, Please try again."));
  }
};
export const updateTrack =
  (formValues, trackId) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}track/updateTrack/${trackId}`, {
        method: "PATCH",

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().communityAuth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(
        eventActions.EditTrack({
          track: res.data,
        })
      );

      dispatch(showSnackbar("success", "Track Updated successfully!"));
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to update track, Please try again.")
      );
    }
  };
export const deleteTrack = (trackId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}track/deleteTrack/${trackId}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(
      eventActions.DeleteTrack({
        trackId: trackId,
      })
    );

    dispatch(showSnackbar("success", "Track Deleted successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to delete track, Please try again.")
    );
  }
};
export const fetchTracks = (eventId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}track/fetchTracks/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(
      eventActions.FetchTracks({
        tracks: res.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to fetch tracks, Please try again.")
    );
  }
};
export const fetchTrack = (trackId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}track/fetchTrack/${trackId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(
      eventActions.FetchTrack({
        track: res.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to fetch track, Please try again."));
  }
};

export const createEventReview =
  (formValues, eventId, userId) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}review/createReview/${eventId}/${userId}`,
        {
          method: "POST",

          body: JSON.stringify({
            ...formValues,
            eventId: eventId,
            userId: userId,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(
        reviewActions.CreateReview({
          review: res.data,
        })
      );

      dispatch(showSnackbar("success", "Review created successfully!"));
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to create review, Please try again.")
      );
    }
  };

export const createRecording =
  (formValues, sessionId, url) => async (dispatch, getState) => {
    try {
      let res = await fetch(
        `${BaseURL}recording/createRecording/${sessionId}/${url}`,
        {
          method: "POST",

          body: JSON.stringify({
            ...formValues,
            sessionId: sessionId,
            url: url,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      dispatch(
        recordingActions.CreateRecording({
          recording: res.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to create recording, Please try again")
      );
    }
  };

export const fetchEventReviews = (eventId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}review/fetchReviews/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(
      reviewActions.FetchReviews({
        reviews: res.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to fetch reviews, Please try again")
    );
  }
};

export const fetchRecordings = (eventId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}recording/fetchRecordings/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().communityAuth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(
      recordingActions.FetchRecordings({
        recordings: res.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to fetch recordings, Please try again")
    );
  }
};

export const reportEvent = (eventId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}reportEvent/${eventId}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(
      showSnackbar(
        "success",
        "This event has been reported and we are reviewing it."
      )
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to report event, Please try again.")
    );
  }
};

export const registerFreeTicket =
  (formValues) => async (dispatch, getState) => {
    try {
      let res = await fetch(`${BaseURL}razorpay/registerFreeTicket`, {
        method: "POST",

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      if (!res.ok) {
        if (!res.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(res.message);
        }
      }

      res = await res.json();

      // Inform that ticket has been successfully registered and take back to /user/home

      dispatch(
        showSnackbar(
          "success",
          "Ticket booked successfully, Please check your mail for confirmation."
        )
      );

      window.location.href = `/user/home`;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("error", "failed to register, Please try again."));
    }
  };

export const SetCurrentBoothId = (boothId) => async (dispatch, getState) => {
  dispatch(
    boothActions.SetCurrentBoothId({
      boothId: boothId,
    })
  );
};

export const fetchEventBooth = (boothId) => async (dispatch, getState) => {
  try {
    let res = await fetch(`${BaseURL}fetchEventBooth/${boothId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    if (!res.ok) {
      if (!res.message) {
        throw new Error("Something went wrong");
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();
    console.log(res);

    dispatch(
      boothActions.FetchBooth({
        booth: res.data,
      })
    );
  } catch (err) {
    dispatch(boothActions.hasError(err.message));
    console.log(err);

    dispatch(showSnackbar("error", "Failed to fetch booth, Please try again."));
  }
};

export const uploadBoothPromoImage =
  (file, boothId) => async (dispatch, getState) => {
    try {
      const key = `${boothId}/${UUID()}.${file.type}`;

      s3.getSignedUrl(
        "putObject",
        { Bucket: "bluemeet-inc", Key: key, ContentType: "image/jpeg" },
        async (err, presignedURL) => {
          await uploadS3(presignedURL, file, (percent) => {
            dispatch(
              boothActions.SetPromoImageUploadPercent({
                percent: percent * 1 > 1.2 ? (percent * 1).toFixed(1) : 1.2,
              })
            );
          });

          try {
            // Save this video info in community document.
            const res = await fetch(`${BaseURL}booths/${boothId}/updateBooth`, {
              method: "PATCH",

              body: JSON.stringify({
                promoImage: key,
              }),

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
              },
            });

            const result = await res.json();

            dispatch(
              boothActions.EditBooth({
                booth: result.data,
              })
            );

            dispatch(
              showSnackbar("success", "Promo Image updated successfully!")
            );
            dispatch(
              boothActions.SetPromoImageUploadPercent({
                percent: 0,
              })
            );
          } catch (error) {
            console.log(error);

            dispatch(
              showSnackbar(
                "error",
                "Failed to update promo image, Please try again later."
              )
            );
            dispatch(
              boothActions.SetPromoImageUploadPercent({
                percent: 0,
              })
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to update Promo Image, Please try again."));
      dispatch(
        boothActions.SetPromoImageUploadPercent({
          percent: 0,
        })
      );
    }
  };

export const resetPromoImageUploadPercent =
  () => async (dispatch, getState) => {
    dispatch(
      boothActions.SetPromoImageUploadPercent({
        percent: 0,
      })
    );
  };

export const uploadBoothPosterImage =
  (file, boothId) => async (dispatch, getState) => {
    try {
      const key = `${boothId}/${UUID()}.${file.type}`;

      s3.getSignedUrl(
        "putObject",
        { Bucket: "bluemeet-inc", Key: key, ContentType: "image/jpeg" },
        async (err, presignedURL) => {
          await uploadS3(presignedURL, file, (percent) => {
            dispatch(
              boothActions.SetBoothPosterUploadPercent({
                percent: percent * 1 > 1.2 ? (percent * 1).toFixed(1) : 1.2,
              })
            );
          });

          try {
            // Save this video info in community document.
            const res = await fetch(`${BaseURL}booths/${boothId}/updateBooth`, {
              method: "PATCH",

              body: JSON.stringify({
                boothPoster: key,
              }),

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
              },
            });

            const result = await res.json();

            dispatch(
              boothActions.EditBooth({
                booth: result.data,
              })
            );

            dispatch(
              showSnackbar("success", "Banner Image updated successfully!")
            );
            dispatch(
              boothActions.SetBoothPosterUploadPercent({
                percent: 0,
              })
            );
          } catch (error) {
            console.log(error);

            dispatch(
              showSnackbar(
                "error",
                "Failed to update Banner image, Please try again later."
              )
            );
            dispatch(
              boothActions.SetBoothPosterUploadPercent({
                percent: 0,
              })
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to update banner, Please try again."));
      dispatch(
        boothActions.SetBoothPosterUploadPercent({
          percent: 0,
        })
      );
    }
  };

export const resetBoothPosterUploadPercent =
  () => async (dispatch, getState) => {
    dispatch(
      boothActions.SetBoothPosterUploadPercent({
        percent: 0,
      })
    );
  };

export const uploadVideoForBooth =
  (boothId, eventId, file, handleClose) => async (dispatch, getState) => {
    try {
      const key = `${boothId}/${UUID()}.mp4`;

      s3.getSignedUrl(
        "putObject",
        {
          Bucket: "bluemeet-inc",
          Key: key,
          ContentType: "video/mp4",
        },
        async (err, presignedURL) => {
          await uploadS3(presignedURL, file, (percent) => {
            dispatch(
              boothActions.SetVideoUploadPercent({
                percent: percent * 1 > 1.2 ? (percent * 1).toFixed(1) : 1.2,
              })
            );
          });

          try {
            // Save this video info in community document.
            const res = await fetch(
              `${BaseURL}booths/saveVideo/${boothId}/${eventId}`,
              {
                method: "POST",

                body: JSON.stringify({
                  name: file.name,
                  key: key,
                }),

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getState().auth.token}`,
                },
              }
            );

            const result = await res.json();

            dispatch(
              boothActions.UploadVideo({
                video: result.data,
              })
            );

            handleClose();

            dispatch(
              showSnackbar("success", "Video file uploaded successfully!")
            );
            dispatch(
              boothActions.SetVideoUploadPercent({
                percent: 0,
              })
            );
          } catch (error) {
            console.log(error);

            dispatch(
              showSnackbar("error", "Failed to upload video, Please try again.")
            );
            dispatch(
              boothActions.SetVideoUploadPercent({
                percent: 0,
              })
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to upload video, Please try again."));
      dispatch(
        boothActions.SetVideoUploadPercent({
          percent: 0,
        })
      );
    }
  };

export const resetBoothVideoProgress = () => async (dispatch, getState) => {
  try {
    dispatch(
      boothActions.SetVideoUploadPercent({
        percent: 0,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const getBoothVideos =
  (boothId, eventId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}booths/getBoothVideos/${boothId}/${eventId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      const result = await res.json();

      dispatch(
        boothActions.FetchVideos({
          videos: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to fetch videos, Please try again!")
      );
    }
  };

export const deleteBoothVideo = (videoId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}booths/deleteBoothVideo/${videoId}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      boothActions.DeleteVideo({
        videoId: videoId,
      })
    );

    dispatch(showSnackbar("success", "Video deleted successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to delete video, Please try again.")
    );
  }
};

export const addBoothProduct =
  (formValues, file, eventId, boothId, handleClose) =>
  async (dispatch, getState) => {
    try {
      const key = `${eventId}/${boothId}/${UUID()}.${file.type}`;

      s3.getSignedUrl(
        "putObject",
        { Bucket: "bluemeet-inc", Key: key, ContentType: "image/jpeg" },
        async (err, presignedURL) => {
          await uploadS3(presignedURL, file, (percent) => {
            console.log(percent);
          });

          try {
            const res = await fetch(
              `${BaseURL}booths/addNewProduct/${boothId}/${eventId}`,
              {
                method: "POST",

                body: JSON.stringify({
                  ...formValues,
                  key: key,
                }),

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getState().auth.token}`,
                },
              }
            );

            const result = await res.json();

            dispatch(
              boothActions.AddProduct({
                product: result.data,
              })
            );

            dispatch(showSnackbar("success", "Product added successfully!"));
            handleClose();
          } catch (error) {
            console.log(error);
            dispatch(showSnackbar("Failed to add product, Please try again."));
            handleClose();
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to add product, Please try again."));
      handleClose();
    }
  };

export const editProduct =
  (formValues, file, boothId, eventId, productId, handleClose) =>
  async (dispatch, getState) => {
    try {
      if (file) {
        const key = `${eventId}/${boothId}/${UUID()}.${file.type}`;

        s3.getSignedUrl(
          "putObject",
          { Bucket: "bluemeet-inc", Key: key, ContentType: "image/jpeg" },
          async (err, presignedURL) => {
            await uploadS3(presignedURL, file, (percent) => {
              console.log(percent);
            });

            try {
              const res = await fetch(
                `${BaseURL}booths/editProduct/${productId}`,
                {
                  method: "PATCH",

                  body: JSON.stringify({
                    ...formValues,
                    image: key,
                  }),

                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().auth.token}`,
                  },
                }
              );

              const result = await res.json();

              dispatch(
                boothActions.UpdateProduct({
                  product: result.data,
                })
              );

              dispatch(
                showSnackbar("success", "Product updated successfully!")
              );
              handleClose();
            } catch (error) {
              console.log(error);
              dispatch(
                showSnackbar("Failed to update product, Please try again.")
              );
              handleClose();
            }
          }
        );
      } else {
        try {
          const res = await fetch(`${BaseURL}booths/editProduct/${productId}`, {
            method: "PATCH",

            body: JSON.stringify({
              ...formValues,
            }),

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getState().auth.token}`,
            },
          });

          const result = await res.json();

          dispatch(
            boothActions.UpdateProduct({
              product: result.data,
            })
          );

          dispatch(showSnackbar("success", "Product updated successfully!"));
          handleClose();
        } catch (error) {
          console.log(error);
          dispatch(showSnackbar("Failed to update product, Please try again."));
          handleClose();
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to update product, Please try again."));
      handleClose();
    }
  };

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}booths/deleteProduct/${productId}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      boothActions.DeleteProduct({
        productId: productId,
      })
    );

    dispatch(showSnackbar("Product deleted successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("Failed to delete product, Please try again."));
  }
};

export const fetchBoothProduct = (productId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}booths/getProductDetails/${productId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      boothActions.FetchProduct({
        product: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("Failed to fetch product, Please try again."));
  }
};

export const fetchBoothProducts =
  (boothId, eventId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}booths/getBoothProducts/${boothId}/${eventId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      const result = await res.json();

      dispatch(
        boothActions.FetchProducts({
          products: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to fetch products, Please try again")
      );
    }
  };

export const addFile =
  (formValues, file, boothId, eventId, handleClose) =>
  async (dispatch, getState) => {
    try {
      const key = `${eventId}/${boothId}/${UUID()}.${file.type}`;

      s3.getSignedUrl(
        "putObject",
        { Bucket: "bluemeet-inc", Key: key, ContentType: "file/pdf" },
        async (err, presignedURL) => {
          await uploadS3(presignedURL, file, (percent) => {
            console.log(percent);
          });

          try {
            const res = await fetch(
              `${BaseURL}booths/addNewFile/${boothId}/${eventId}`,
              {
                method: "POST",

                body: JSON.stringify({
                  ...formValues,
                  key: key,
                  boothId,
                  eventId,
                }),

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getState().auth.token}`,
                },
              }
            );

            const result = await res.json();

            dispatch(
              boothActions.AddFile({
                file: result.data,
              })
            );

            dispatch(showSnackbar("success", "File added successfully!"));

            handleClose();
          } catch (error) {
            console.log(error);
            dispatch(showSnackbar("Failed to add product, Please try again."));
            handleClose();
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to add product, Please try again."));
    }
  };

export const deleteFile = (fileId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}booths/deleteFile/${fileId}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      boothActions.DeleteFile({
        fileId: fileId,
      })
    );

    dispatch(showSnackbar("success", "File deleted successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to delete File, Please try again."));
  }
};

export const fetchBoothFiles =
  (boothId, eventId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}booths/getFiles/${boothId}/${eventId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      const result = await res.json();

      dispatch(
        boothActions.FetchFiles({
          files: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to fetch files, Please try again.")
      );
    }
  };

export const addLink =
  (formValues, boothId, eventId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}booths/addNewLink/${boothId}/${eventId}`,
        {
          method: "POST",

          body: JSON.stringify({
            ...formValues,
            boothId: boothId,
            eventId: eventId,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      const result = await res.json();

      dispatch(
        boothActions.AddLink({
          link: result.data,
        })
      );

      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to add Link, Please try again."));
      handleClose();
    }
  };

export const editLink =
  (formValues, linkId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}booths/editLink/${linkId}`, {
        method: "PATCH",

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      dispatch(
        boothActions.UpdateLink({
          link: result.data,
        })
      );

      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to edit Link, Please try again."));
      handleClose();
    }
  };

export const deleteLink = (linkId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}booths/deleteLink/${linkId}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      boothActions.DeleteLink({
        linkId: linkId,
      })
    );

    dispatch(showSnackbar("success", "Link deleted successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("Failed to delete Link, Please try again."));
  }
};

export const fetchLink = (linkId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}booths/getLinkDetails/${linkId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      boothActions.FetchLink({
        link: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Faild to fetch link, Please try again."));
  }
};

export const fetchLinks = (boothId, eventId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}booths/getLinks/${boothId}/${eventId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      boothActions.FetchLinks({
        links: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Faild to fetch links, Please try again."));
  }
};

export const addPromoCode =
  (formValues, boothId, eventId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}booths/createPromoCode/${boothId}/${eventId}`,
        {
          method: "POST",

          body: JSON.stringify({
            ...formValues,
            boothId: boothId,
            eventId: eventId,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      const result = await res.json();

      dispatch(
        boothActions.AddOffer({
          offer: result.data,
        })
      );

      dispatch(showSnackbar("success", "Promo code added successfully!"));
      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to add Promo Code, Please try again.")
      );
    }
  };
export const editPromoCode =
  (formValues, promoCodeId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}booths/editPromoCode/${promoCodeId}`, {
        method: "PATCH",

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      dispatch(
        boothActions.UpdateOffer({
          offer: result.data,
        })
      );

      dispatch(showSnackbar("success", "Promo code updated successfully!"));
      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to edit Promo Code, Please try again.")
      );
      handleClose();
    }
  };
export const deletePromoCode = (promoCodeId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}booths/deletePromoCode/${promoCodeId}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      boothActions.DeleteOffer({
        offerId: promoCodeId,
      })
    );

    dispatch(showSnackbar("success", "Promo code deleted successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to delete Promo Code, Please try again.")
    );
  }
};

export const fetchPromoCode = (promoCodeId) => async (dispatch, getState) => {
  try {
    const res = await fetch(
      `${BaseURL}booths/getPromoCodeDetails/${promoCodeId}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );

    const result = await res.json();

    dispatch(
      boothActions.FetchOffer({
        offer: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar("error", "Failed to fetch Promo code, Please try again.")
    );
  }
};

export const fetchPromoCodes =
  (boothId, eventId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}booths/getPromoCodes/${boothId}/${eventId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      const result = await res.json();

      dispatch(
        boothActions.FetchOffers({
          offers: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to fetch promo codes, Please try again.")
      );
    }
  };

export const sendBusinessCardsViaMail = () => async (dispatch, getState) => {
  try {
  } catch (error) {
    console.log(error);
    dispatch(
      showSnackbar(
        "error",
        "Failed to send business cards via mail, Please try again."
      )
    );
  }
};

export const shareBusinessCard =
  (userId, eventId, boothId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}booths/shareBusinessCard/${userId}/${eventId}/${boothId}/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      const result = await res.json();

      dispatch(showSnackbar("success", "Business card shared successfully!"));
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar(
          "error",
          "Failed to share business card, Please try again."
        )
      );
    }
  };

export const fetchBusinessCards =
  (boothId, eventId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}booths/getBusinessCards/${boothId}/${eventId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      const result = await res.json();

      dispatch(
        boothActions.FetchBusinessCards({
          cards: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar(
          "error",
          "Failed to fetch Business cards, Please try again."
        )
      );
    }
  };

export const addForm =
  (formValues, boothId, eventId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}booths/createForm/${boothId}/${eventId}`,
        {
          method: "POST",

          body: JSON.stringify({
            ...formValues,
            boothId: boothId,
            eventId: eventId,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      const result = await res.json();

      dispatch(
        boothActions.AddForm({
          form: result.data,
        })
      );

      dispatch(showSnackbar("success", "Form added successfully!"));
      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to add form, Please try again."));
    }
  };

export const editForm =
  (formValues, formDocId, handleClose) => async (dispatch, getState) => {
    try {
      const res = await fetch(`${BaseURL}booths/editForm/${formDocId}`, {
        method: "PATCH",

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      dispatch(
        boothActions.UpdateForm({
          form: result.data,
        })
      );

      dispatch(showSnackbar("success", "Form updated successfully!"));
      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Failed to edit form, Please try again."));
    }
  };

export const deleteForm = (formDocId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}booths/deleteForm/${formDocId}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      boothActions.DeleteForm({
        formId: formDocId,
      })
    );

    dispatch(showSnackbar("success", "Form deleted successfully!"));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("Failed to delete form, Please try again."));
  }
};

export const fetchBoothForm = (formDocId) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${BaseURL}booths/getFormDetails/${formDocId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    dispatch(
      boothActions.FetchForm({
        form: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar("error", "Failed to fetch form, Please try again"));
  }
};

export const fetchBoothForms =
  (boothId, eventId) => async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${BaseURL}booths/getForms/${boothId}/${eventId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      const result = await res.json();

      dispatch(
        boothActions.FetchForms({
          forms: result.data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar("error", "Failed to fetch forms, Please try again")
      );
    }
  };

export const editCurrentlyJoinedChair =
  (chairId) => async (dispatch, getState) => {
    dispatch(
      userActions.EditCurrentlyJoinedChair({
        chairId: chairId,
      })
    );
  };

export const fetchNetworkingRoomDetails =
  (networkingRoom) => async (dispatch, getState) => {
    dispatch(
      networkingActions.FetchNetworkingRoomDetails({
        networkingRoom: networkingRoom,
      })
    );
  };
