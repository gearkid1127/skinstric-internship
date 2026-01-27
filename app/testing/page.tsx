"use client";

// ROUTE: /testing

import { useRouter } from "next/navigation";

export default function TestingPage() {
  const router = useRouter();

  return (
    <section className="testing">
      <div className="testing-frame">
        <div className="testing-kicker">
          <span className="testing-kicker-title">TO START ANALYSIS</span>
        </div>

        <div className="testing-center">
          <div className="testing-options" role="list">
            {/* CAMERA */}
            <button
              type="button"
              className="testing-choice testing__choice--camera"
              onClick={() => router.push("/testing/camera")}
            >
              <span className="testing-choice-frame" aria-hidden="true" />
              <span
                className="testing-choice-frame testing-choice-frame-inner"
                aria-hidden="true"
              />

              {/* ✅ icon becomes the anchor */}
              <span className="testing-choice-icon" aria-hidden="true">
                <svg
                  width="136"
                  height="136"
                  viewBox="0 0 136 136"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="67.9996"
                    cy="67.9997"
                    r="57.7857"
                    stroke="#1A1B1C"
                  />
                  <circle cx="68" cy="68" r="51" fill="#1A1B1C" />
                  <path
                    d="M100.668 35.412C92.3149 27.0382 80.7627 21.8569 68.0003 21.8569C65.0469 21.8569 62.1583 22.1344 59.3592 22.6647C64.1338 30.5633 81.5795 58.2549 84.9406 63.1803C85.5932 64.1371 86.753 62.2365 93.7783 48.6929L100.668 35.412Z"
                    fill="#FCFCFC"
                  />
                  <path
                    d="M25.0882 51.004C30.5815 37.1459 42.5936 26.5816 57.3413 23.0942C59.0872 25.713 62.4221 30.8872 66.0668 36.6493L75.3267 51.2908H48.8858C36.1263 51.2908 28.6691 51.2077 25.0882 51.004Z"
                    fill="#FCFCFC"
                  />
                  <path
                    d="M31.8694 96.7032C25.602 88.8246 21.8574 78.8495 21.8574 67.9998C21.8574 62.801 22.7172 57.803 24.3023 53.1402H39.1666C56.552 53.1402 56.9478 53.1674 56.3267 54.3294C55.0953 56.6338 36.8239 88.2621 31.8694 96.7032Z"
                    fill="#FCFCFC"
                  />
                  <path
                    d="M76.9643 113.273C74.0646 113.843 71.0674 114.143 68.0003 114.143C54.1917 114.143 41.7998 108.077 33.3436 98.465C35.1707 94.4055 39.9295 85.9319 48.1717 72.0115C48.9468 70.7014 49.7323 69.781 49.917 69.966C50.1016 70.1503 56.6037 80.5196 64.3671 93.0077L76.9643 113.273Z"
                    fill="#FCFCFC"
                  />
                  <path
                    d="M111.529 83.348C106.372 97.9733 94.0533 109.22 78.7841 112.876C74.5785 106.389 60.6125 83.9565 60.6125 83.6094C60.6125 83.4658 72.6814 83.348 87.4326 83.348H111.529Z"
                    fill="#FCFCFC"
                  />
                  <path
                    d="M101.902 36.6966C109.5 44.922 114.143 55.9187 114.143 67.9998C114.143 72.923 113.372 77.6662 111.944 82.115H96.5965C86.6243 82.115 78.4651 81.9646 78.4651 81.7803C78.4651 81.3997 98.4368 43.0157 101.902 36.6966Z"
                    fill="#FCFCFC"
                  />
                </svg>

                {/* ✅ callout moved INSIDE icon */}
                <span className="testing-choice-callout" aria-hidden="true">
                  <span className="testing-choice-connector" />
                  <span className="testing-choice-label">
                    <span className="testing-choice-label-top">ALLOW A.I.</span>
                    <span className="testing-choice-label-bottom">
                      TO SCAN YOUR FACE
                    </span>
                  </span>
                </span>
              </span>
            </button>

            {/* GALLERY */}
            <button
              type="button"
              className="testing-choice testing__choice--gallery"
              onClick={() => router.push("/testing/gallery")}
            >
              <span className="testing-choice-frame" aria-hidden="true" />
              <span
                className="testing-choice-frame testing-choice-frame-inner"
                aria-hidden="true"
              />

              {/* ✅ icon becomes the anchor */}
              <span className="testing-choice-icon" aria-hidden="true">
                <svg
                  width="136"
                  height="136"
                  viewBox="0 0 136 136"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="67.9996"
                    cy="67.9997"
                    r="57.7857"
                    stroke="#1A1B1C"
                  />
                  <circle
                    cx="68"
                    cy="68"
                    r="50"
                    fill="#FCFCFC"
                    stroke="#1A1B1C"
                    strokeWidth="2"
                  />
                  <path
                    d="M78.3214 68C85.3631 68 91.0714 62.2916 91.0714 55.25C91.0714 48.2084 85.3631 42.5 78.3214 42.5C71.2798 42.5 65.5714 48.2084 65.5714 55.25C65.5714 62.2916 71.2798 68 78.3214 68Z"
                    fill="#1A1B1C"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 68C17 71.9604 17.4514 75.8154 18.3056 79.5163C23.5265 102.136 43.7939 119 68 119C94.8673 119 116.882 98.2244 118.856 71.862C118.951 70.5872 119 69.2993 119 68C119 39.8335 96.1665 17 68 17C39.8335 17 17 39.8335 17 68ZM35.3365 67.7257L19.3825 78.7708C18.6175 75.3024 18.2143 71.6983 18.2143 68C18.2143 40.5041 40.5041 18.2143 68 18.2143C95.4959 18.2143 117.786 40.5041 117.786 68C117.786 69.5412 117.716 71.0661 117.579 72.5716L82.9447 91.8127C80.4324 93.2084 77.3343 92.9968 75.0351 91.2724L43.855 67.8874C41.3462 66.0058 37.9149 65.9406 35.3365 67.7257Z"
                    fill="#1A1B1C"
                  />
                </svg>

                <span className="testing-choice-callout" aria-hidden="true">
                  <span className="testing-choice-connector" />
                  <span className="testing-choice-label">
                    <span className="testing-choice-label-top">ALLOW A.I.</span>
                    <span className="testing-choice-label-bottom">
                      ACCESS GALLERY
                    </span>
                  </span>
                </span>
              </span>
            </button>
          </div>
        </div>
        <button
          type="button"
          className="testing-back"
          onClick={() => router.back()}
          aria-label="Back"
        >
          <svg
            width="97"
            height="44"
            viewBox="0 0 97 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.293 22L22 43.293L0.707031 22L22 0.707031L43.293 22Z"
              stroke="#1A1B1C"
            />
            <path
              d="M15.7139 22L25.1424 27.4436V16.5564L15.7139 22Z"
              fill="#1A1B1C"
            />
            <path
              opacity="0.7"
              d="M64.872 28C66.93 28 68.288 26.922 68.288 25.102C68.288 23.786 67.532 23.002 66.608 22.652C67.21 22.344 67.798 21.644 67.798 20.72C67.798 19.096 66.524 18.2 64.732 18.2H60.938V28H64.872ZM62.758 19.684H64.578C65.586 19.684 66.076 20.104 66.076 20.86C66.076 21.616 65.586 22.036 64.606 22.036H62.758V19.684ZM62.758 23.604H64.676C65.922 23.604 66.51 24.108 66.51 25.004C66.51 25.914 65.922 26.39 64.676 26.39H62.758V23.604ZM77.6856 28L73.9056 18.2H72.1696L68.4036 28H70.3076L71.1476 25.718H74.9276L75.7676 28H77.6856ZM73.0516 20.566L74.3676 24.15H71.7356L73.0516 20.566ZM82.4387 28.112C84.8467 28.112 86.6387 26.726 86.8347 24.696H84.9867C84.8187 25.76 83.7827 26.502 82.4387 26.502C80.7307 26.502 79.4427 25.326 79.4427 23.1C79.4427 20.874 80.7307 19.684 82.4387 19.684C83.7547 19.684 84.7907 20.426 84.9307 21.504H86.8627C86.5967 19.474 84.8047 18.088 82.4387 18.088C79.8767 18.088 77.5807 19.768 77.5807 23.1C77.5807 26.432 79.8347 28.112 82.4387 28.112ZM96.3629 28L92.4009 22.092L95.9989 18.2H93.6889L89.7549 22.47V18.2H87.8929V28H89.7549V24.948L91.1269 23.464L94.0669 28H96.3629Z"
              fill="#1A1B1C"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
