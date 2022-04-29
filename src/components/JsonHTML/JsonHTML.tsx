import React, { useState } from "react";
import "./JsonHTML.css";
import { IconButton, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import GetAppIcon from "@material-ui/icons/GetApp";
import FindInPageIcon from "@material-ui/icons/FindInPage";

interface Props {
  title?: string;
  json: { [key: string]: any };
  closeView?: () => void;
  showButtons: boolean;
}

export default function JsonHTML(props: Props) {
  const { title, json, closeView, showButtons } = props;

  const [isJson, setIsJson] = useState(false);
  const [text, setText] = useState("View in JSON");

  const openInJson = () => {
    setIsJson(!isJson);
    setText(text === "View in JSON" ? "View Formatted" : "View in JSON");
  };

  const viewJson = () => {
    let jsonObject = JSON.stringify(json);
    let formattedJson = jsonObject.split(",").join("\n");

    return (
      <ul className="json-container">
        <li>{formattedJson}</li>
      </ul>
    );
  };

  const getRender = (): JSX.Element => {
    const handleBoolean = (
      value: boolean,
      key: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      const valueElement: JSX.Element = (
        <h6 className="healthy-value">{value ? "True" : "False"}</h6>
      );

      return (
        <li key={key}>
          {displayTitle ? (
            <h6>
              {key + ": "}
              <span>{valueElement}</span>
            </h6>
          ) : null}
        </li>
      );
    };

    const handleText = (
      text: string,
      key: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      return (
        <li key={key}>
          {displayTitle ? (
            <h6>
              {key + ": "}
              <span>{text}</span>
            </h6>
          ) : null}
        </li>
      );
    };

    const handleArray = (
      array: Array<any>,
      key: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      const valueElement: JSX.Element = (
        <ul className="containers-ul">
          {array.map((value, i) => {
            if (["string", "number"].includes(typeof value)) {
              return handleText(value, i, false);
            } else if (Array.isArray(value)) {
              return handleArray(value, i, false);
            } else if (typeof value === "boolean") {
              return handleBoolean(value, i, false);
            } else if (typeof value === "object") {
              return handleObject(value, i, false);
            }
            return null;
          })}
        </ul>
      );

      return (
        <li key={key}>
          {displayTitle ? <h6>{key}</h6> : null}
          {valueElement}
        </li>
      );
    };

    const handleObject = (
      object: Object,
      key?: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      const getObjectElement = (): Array<JSX.Element> => {
        let element: Array<JSX.Element> = [];
        for (let [key, value] of Object.entries(object)) {
          console.log(`${key}: ${value} -> ${typeof value}`);
          if (["string", "number"].includes(typeof value)) {
            element.push(handleText(value, key, true));
          } else if (Array.isArray(value)) {
            element.push(handleArray(value, key, true));
          } else if (typeof value === "boolean") {
            element.push(handleBoolean(value, key, true));
          } else if (typeof value === "object") {
            element.push(handleObject(value, key, true));
          }
        }
        return element;
      };
      return key ? (
        <li key={key}>
          {displayTitle ? <h6>{key}</h6> : null}
          <ul className="containers-ul">{getObjectElement()}</ul>
        </li>
      ) : (
          <ul className="containers-ul">{getObjectElement()}</ul>
        );
    };

    return handleObject(json, undefined, false);
  };

  return (
    <>
      <Grid container className="container-info-div">
        <Grid item xs={8}>
          {title ? <h5 className="title">{title}</h5> : null}
        </Grid>
        <Grid item xs={4}>
          {showButtons ? <div className="buttons-container">
            <button className="json-button" onClick={openInJson}>
              {text}
              <FindInPageIcon fontSize="small" />
            </button>
            <a
              href={URL.createObjectURL(
                new Blob([JSON.stringify(json, null, 2)], {
                  type: "text/plain",
                })
              )}
              download={title + "JSON.txt"}
            >
              <button className="download-button">
                Download
                <GetAppIcon fontSize="small" />
              </button>
            </a>
            <IconButton onClick={closeView}>
              <CloseIcon fontSize="small" id="close-icon" />
            </IconButton>
          </div> : null}
        </Grid>
      </Grid>
      <div className="container-div">{isJson ? viewJson() : getRender()}</div>
    </>
  );
}
