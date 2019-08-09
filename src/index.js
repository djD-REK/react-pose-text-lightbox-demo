// Responsive Breakpoints Lightbox using React.js
// by Dr. Derek Austin 8/8/2019

// Thanks to the source sandboxes!
// React Pose Text sandbox by @InventingWithMonste https://codesandbox.io/s/4jzzvm1vz7
// react-spring-lightbox-example by @cwgw https://codesandbox.io/s/reactspringlightboxexample-lx8sc
// Viva CodeSandbox.io

import React from "react";
import ReactDOM from "react-dom";
import SplitText from "react-pose-text";
import { animated, useSpring } from "react-spring";

import "./styles.css";

// Full React Pose Text documentation can be found at
// https://popmotion.io/pose/api/react-pose-text

const charPosesH1 = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 1
  }
};

const charPosesH4 = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 25
  }
};

const charPosesH2 = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 200
  }
};

const charPosesH3 = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 100
  }
};

function optimizedImage() {
  // thanks Cloudinary!
  return (
    <picture>
      <source
        media="(max-width: 767px)"
        sizes="(max-width: 767px) 100vw, 767px"
        srcset="
        https://i.lensdump.com/i/iiPzWT.jpg 190w,
        https://i.lensdump.com/i/iiPSVb.jpg 767w"
        style={{
          // lightbox CSS magic
          width: "100%",
          height: "100%",
          objectFit: "contain"
        }}
      />
      <source
        media="(min-width: 768px) and (max-width: 991px)"
        sizes="(max-width: 991px) 70vw, 694px"
        srcset="
        https://i.lensdump.com/i/iiPev7.jpg 538w,
        https://i.lensdump.com/i/iiPnGr.jpg 694w"
        style={{
          // lightbox CSS magic
          width: "100%",
          height: "100%",
          objectFit: "contain"
        }}
      />
      <source
        media="(min-width: 992px) and (max-width: 1199px)"
        sizes="(max-width: 1200px) 60vw, 720px"
        srcset="
        https://i.lensdump.com/i/iiPLEF.jpg 596w,
        https://i.lensdump.com/i/iiPMH3.jpg 720w"
        style={{
          // lightbox CSS magic
          width: "100%",
          height: "100%",
          objectFit: "contain"
        }}
      />
      <img
        sizes="(max-width: 9600px) 40vw, 3840px"
        srcset="
        https://i.lensdump.com/i/iiPYX0.jpg 480w,
        https://i.lensdump.com/i/iiPugD.jpg 2451w,
        https://i.lensdump.com/i/iiPD3q.jpg 3319w,
        https://i.lensdump.com/i/iiPNNA.jpg 3840w"
        src="https://i.lensdump.com/i/iiPNNA.jpg"
        alt=""
        style={{
          // lightbox CSS magic
          width: "100%",
          height: "100%",
          objectFit: "contain"
        }}
      />
    </picture>
  );
}

const getPosition = el => {
  let rect = {
    top: 0,
    left: 0,
    height: 1,
    width: 1
  };

  if (el) {
    rect = el.getBoundingClientRect();
  }

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowAspectRatio = windowWidth / windowHeight;
  const imageAspectRatio = rect.width / rect.height;

  const modalHeight =
    windowAspectRatio > imageAspectRatio
      ? windowHeight
      : windowWidth / imageAspectRatio;

  const modalWidth =
    windowAspectRatio < imageAspectRatio
      ? windowWidth
      : windowHeight * imageAspectRatio;

  return {
    positionOnPage: {
      top: rect.top,
      left: rect.left,
      height: rect.height,
      width: rect.width
    },
    positionInModal: {
      top: (windowHeight - modalHeight) / 2,
      left: (windowWidth - modalWidth) / 2,
      height: modalHeight,
      width: modalWidth
    }
  };
};

const App = () => {
  const [counter, increaseCounter] = React.useState(0); // counts times light box is open to cycle images

  const ref = React.useRef();

  const images = [
    "penguin.jpg"
    // "https://placekitten.com/g/200/300"
    // add more images here
  ];

  const [isOpen, setModalState] = React.useState(false);

  const [style, setStyle] = useSpring(() => {
    const { positionOnPage, positionInModal } = getPosition(ref.current);
    return {
      from: positionOnPage,
      to: positionInModal
    };
  });

  const openModal = () => {
    const { positionOnPage, positionInModal } = getPosition(ref.current);
    setStyle({
      from: positionOnPage,
      to: positionInModal
    });
    setModalState(true);
  };

  const closeModal = () => {
    const { positionOnPage, positionInModal } = getPosition(ref.current);
    setStyle({
      from: positionInModal,
      to: positionOnPage
    });
    setModalState(false);

    increaseCounter(counter.getState + 1);
  };

  return (
    <>
      {/* page */}
      <div
        className="container"
        style={{
          width: "100%",
          margin: "1rem auto",
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
          rel="stylesheet"
        />

        <h1>
          <span role="img" aria-label="grin emoji">
            😁
          </span>{" "}
          <SplitText initialPose="exit" pose="enter" charPoses={charPosesH1}>
            Cloudinary Photo Lightbox Demo by djD-REK
          </SplitText>
        </h1>
        <h4>
          <span role="img" aria-label="grin emoji">
            😁
          </span>{" "}
          <SplitText initialPose="exit" pose="enter" charPoses={charPosesH4}>
            Pagespeed optimization for responsive mobile websites using
            "Responsive Breakpoints" (multiple image sizes created by
            Cloudinary)
          </SplitText>
        </h4>
        <h3>
          <span role="img" aria-label="grin emoji">
            😁
          </span>{" "}
          <SplitText initialPose="exit" pose="enter" charPoses={charPosesH3}>
            Created using Cloudinary, React Pose Text & CodeSandbox.io
          </SplitText>
        </h3>
        <h2>
          <span role="img" aria-label="grin emoji">
            😁
          </span>{" "}
          <SplitText initialPose="exit" pose="enter" charPoses={charPosesH3}>
            Click on image to open lightbox ⇓⇓⇓
          </SplitText>
        </h2>
        <div
          alt=""
          className="zoom-in"
          onClick={openModal}
          ref={ref}
          src={images[0]}
          style={{
            cursor: "zoom-in"
          }}
        >
          {optimizedImage()}
        </div>
      </div>

      {/* modal */}
      <div
        onClick={closeModal}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: isOpen ? "block" : "none",
          background: "black",
          cursor: "zoom-out"
        }}
      >
        <animated.div
          style={{
            position: "absolute",
            top: style.top.interpolate(n => `${n}px`),
            left: style.left.interpolate(n => `${n}px`),
            width: style.width.interpolate(n => `${n}px`),
            height: style.height.interpolate(n => `${n}px`)
            /* repeat image with different style for lightbox */
          }}
        >
          {optimizedImage}
        </animated.div>
        <p
          style={{
            position: "absolute",
            top: 0,
            left: "1rem",
            color: "blue"
          }}
        >
          Click anywhere to close lightbox
        </p>
      </div>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
