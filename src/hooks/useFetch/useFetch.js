"use client";
import React, { useState, useEffect } from "react";
import { useAlert } from "../useAlert/useAlert";

export const useFetch = ({
  functionFetch,
  params: initialParams,
  body: initialBody,
  showAlertSuccess,
  fetchInit = true,
}) => {
  const { setShowAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [fetchResults, setFetchResults] = useState([]);

  const responseFetch = async ({ params, body }) => {
    const newParams = Object.assign({}, initialParams, params);
    const newBody = Object.assign({}, initialBody, body);

    try {
      setLoading(true);
      const searchResults = await functionFetch({
        params: newParams,
        body: newBody,
      });
      if (searchResults?.error)
        throw new Error(`Fetch failed, Error: ${searchResults?.error}`);
      setFetchResults(searchResults);
      if (showAlertSuccess)
        setShowAlert({
          show: true,
          message: showAlertSuccess,
          type: "success",
        });
      return searchResults;
    } catch (error) {
      console.error(error.message);
      setErrors(error.message);
      setShowAlert({ show: true, message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchInit) responseFetch({});
  }, []);

  return [fetchResults, responseFetch, loading, errors];
};