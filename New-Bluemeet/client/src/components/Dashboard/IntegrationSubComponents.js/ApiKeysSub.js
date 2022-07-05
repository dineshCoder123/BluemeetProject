/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Divider } from "@material-ui/core";
import Loader from "../../Loader";
import ApiKeysListFields from "./GridComponents/ApiKeysListFields";
import NoContentFound from "../../NoContent";
import NoKeyFound from "./../../../assets/images/NoKeyFound.png";
import ApiKeysDetailsCard from "./GridComponents/ApiKeysDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchApiKeys } from "../../../actions";

const ApiKeysSub = () => {
  const { apiKeys, isLoading } = useSelector((state) => state.apikey);

  const params = useParams();
  const communityId = params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApiKeys(communityId));
  }, []);

  const renderApiKeys = (apiKeys) => {
    return apiKeys
      .slice(0)
      .reverse()
      .map((apiKey) => {
        const {
          isEnabled,
          createdAt,
          communityId,
          label,
          APIKey,
          APISecret,
          createdBy,
          id,
        } = apiKey;

        return (
          <>
            <ApiKeysDetailsCard
              key={id}
              isEnabled={isEnabled}
              createdAt={createdAt}
              label={label}
              APIKey={APIKey}
              APISecret={APISecret}
              createdBy={createdBy}
              communityId={communityId}
              id={id}
            />

            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>
          </>
        );
      });
  };

  const preProcessedAPIKeys = apiKeys.filter((el) => el.deleted !== true);

  return (
    <>
      <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
        <ApiKeysListFields />
        <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
          <Divider />
        </div>
        {isLoading ? (
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "60vh" }}
          >
            <Loader />
          </div>
        ) : typeof preProcessedAPIKeys !== "undefined" &&
          preProcessedAPIKeys.length > 0 ? (
          renderApiKeys(preProcessedAPIKeys)
        ) : (
          <div
            style={{ height: "63vh", width: "100%" }}
            className="d-flex flex-row align-items-center justify-content-center"
          >
            <NoContentFound
              msgText="No Api keys were found!"
              img={NoKeyFound}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ApiKeysSub;
