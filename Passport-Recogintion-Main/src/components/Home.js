import React from "react";
import "./home.css";
import CarouselComp from "./Carousel/CarouselComp";
import Webcam from "react-webcam";
import { useEffect } from "react";

export default function Home() {
  //////////////////////////////////////////////////////////////// vars

  const url = "http://127.0.0.1:5000/api/upload";
  const videoConstraints = {
    width: 388,
    height: 290,
  };
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [myContent, setMyContent] = React.useState();
  const [myclass, setMyClass] = React.useState("");
  const [spinner, setSpinner] = React.useState(false);
  const [data, setData] = React.useState(null);

  ////////////////////////////////////////////////////////////////// functions

  useEffect(() => {
    setMyContent("Show your Passport in front of the camera");
    setMyClass("text-black text-center");
  }, []);

  ///// func to post request to send(form)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async (form) => {
    // display the spinner

    setMyContent("Recognizing...");
    setMyClass("text-primary text-center");

    // fetch the data post req.
    fetch(url, {
      method: "POST",
      body: form,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        handleContent(data);
      })
      .catch((err) => {
        setSpinner(false);
        err.message = 403
          ? setMyContent("Couldn't Recognize Passport")
          : setMyContent("this passport is already exists");
        setMyClass("text-danger text-center");
      });
  };

  //// handle the style of date dd/mm/yy
  const handleDate = (date) => {
    const stringDate = date.toString();

    const year = stringDate.slice(0, 2);
    let y = "19";
    if (year > 30) {
      y += year;
    } else if (year < 30) {
      y = "20" + year;
    } else {
      y = "";
    }

    const m = stringDate.slice(2, 4);
    const d = stringDate.slice(4, 6);
    return `${d}/${m}/${y}`;
  };

  //// check the number of problem & return message of problem
  const handleProblem = (passProblem) => {
    if (passProblem === "0") {
      return "Not Found";
    } else if (passProblem === "1") {
      return "Invalid date of birth";
    } else if (passProblem === "2") {
      return "Passport has Expired";
    } else if (passProblem === "3") {
      return "Invalid date of birth and Passport has Expired";
    } else if (passProblem === "4") {
      return "Invalid passport number";
    } else if (passProblem === "6") {
      return "Passport has Expired and Invalid passport number";
    } else {
      return "Passport has Expired, Invalid passport number and Invalid passport number";
    }
  };

  //// display data of passport in the div myData

  const handleContent = (data) => {
    setSpinner(false);
    setData(data);
    setMyContent("");
    setMyClass("text-primary");
  };

  //// display spinner loading in the div myData

  //// record video camera and stop in 3 seconds
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleStartCaptureClick = React.useCallback(() => {
	  setRecordedChunks([])
    setData(null);
    setCapturing(true);
    setMyContent("Recording...");
    setMyClass("text-danger text-center");
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    setTimeout(() => {
      handleStopCaptureClick();
      handleSave();
      setCapturing(false);
      setMyContent("click on Detect to get data");
      setMyClass("text-center");
    }, 3000);
    // eslint-disable-next-line no-use-before-define
  });

  //// put all stream data in chunks to video to save it or send req.
  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleSave = React.useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      console.log(blob);
      const form = new FormData();
      form.append("file", blob);
      setSpinner(true);
      await fetchData(form);
      // setSpinner(false);
      setRecordedChunks([]);
    }
  }, [fetchData, recordedChunks]);

  return (
    <div>
      <CarouselComp />
      <div className="container mt-4">
        <div className="">
          <h3 className="my-color text-center my-font font-weight-bold ">
            Let's try...
          </h3>
          <div className=" mx-auto ">
            <div className="mx-auto my-3 ">
              <div className="mx-auto text-center">
                {/* webcam */}
                <Webcam
                  className="mb-2 border-start border-primary border-5"
                  videoConstraints={videoConstraints}
                  audio={false}
                  ref={webcamRef}
                />
                <br />

                {!capturing ? (
                  spinner ? (
                    <div className="text-center mx-auto">
                      <div
                        className="spinner-border  text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={handleStartCaptureClick}
                      >
                        <i className="fas fa-video"></i>
                      </button>
                    </>
                  )
                ) : (
                  <div className="spinner-grow text-danger mt-2" role="status">
                    <span className="visually-hidden">Loading...</span>
					
                  </div>
                )}

                {recordedChunks.length > 0 && (
                 <><button className="btn btn-primary" onClick={handleSave}>
                    Detect
                  </button>
				  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="container mx-auto my-2 " id="my_data">
              <div
                className={`mx-auto border border-2 mb-4 p-4 w-50 ${myclass}`}
                id="my_card_data"
              >
                {myContent}
                {data ? (
                  <ul className="m-4">
                    <li>
                      Name: {data.Name} {data.Surname}
                    </li>
                    <li>Number: {data.Number}</li>
                    <li>Gender: {data.Sex === "M" ? "Male" : "Female"}</li>
                    <li>Date of Birth: {handleDate(data.DateOfBirth)}</li>
                    <li>Expiration date: {handleDate(data.ExpirationDate)}</li>
                    <li>Country: {data.Country}</li>
                    <li>Problem: {handleProblem(data.Problem)}</li>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
