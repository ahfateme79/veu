<template>
  <div>
    <div class="soil-examination">
      <div>
        <div
            class="d-flex justify-content-center"
            v-if="enableConsulting === false"
        >
          <p class="text-center">
            امکان درخواست مشاوره خاک برای سرویس انتخاب شده وجود ندارد
          </p>
        </div>
        <div
            class="d-flex flex-column align-items-center"
            v-if="
            farm !== null &&
            farm !== undefined &&
            farm.consultings.length === 0 &&
            showEmptySoilExamination === true
          "
        >
          <div class="soil-examination-empty-title">آزمایشی وجود ندارد</div>
          <div class="text-center soil-examination-empty-description">
            جهت مشاوره به آزمایش خاک نیاز است، لطفا بر روی دکمه ثبت درخواست
            آزمایش خاک کلیک کنید
          </div>
          <div>
            <button
                class="btn soil-examination-empty-button"
                @click="saveRequest"
            >
              ثبت درخواست آزمایش خاک
            </button>
          </div>
        </div>
        <div class="d-flex flex-column mb-3" v-if="showRequestSoilExamination">
          <div>
            <div
                class="
                d-flex
                flex-row-reverse
                justify-content-between
                align-items-center
                border-bottom
                pb-3
                mb-3
              "
            >
              <div class="soil-examination-request-title">
                درخواست آزمایش خاک
              </div>
              <div class="soil-examination-back">
                <font-awesome-icon icon="chevron-left"></font-awesome-icon>
                ارجاع به صفحه مشاوره
              </div>
            </div>
          </div>
          <div class="d-flex flex-column">
            <label class="mb-2 text-right" for="requestDescription"
            >توضیحات</label
            >
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="d-flex flex-column soil-examination-price">
                  <div
                      class="
                      d-flex
                      justify-content-between
                      align-items-center
                      mb-31
                    "
                  >
                    <div class="d-flex">
                      <span class="unit align-self-center"> تومان </span>
                      <span class="ms-1 price mb-0"> 5000 </span>
                    </div>
                    <span class="soil-examination-price-title">
                      هزینه آزمایش
                    </span>
                  </div>
                  <div
                      class="
                      d-flex
                      justify-content-between
                      align-items-center
                      mb-31
                    "
                  >
                    <div class="d-flex">
                      <span class="unit align-self-center"> تومان </span>
                      <span class="ms-1 price mb-0"> 5000 </span>
                    </div>
                    <span class="soil-examination-price-title">
                      شارژ حساب شما
                    </span>
                  </div>
                  <div
                      class="d-flex justify-content-between align-items-center"
                  >
                    <span> رایگان </span>
                    <span class="soil-examination-price-title">
                      قابل پرداخت
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-8">
                <textarea
                    dir="rtl"
                    id="requestDescription"
                    class="w-100 soil-examination-textarea"
                    v-model="description"
                    aria-required="true"
                />
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button
                class="btn soil-examination-empty-button btn"
                @click="submitSoilExamination"
                v-if="!loading"
            >
              ثبت درخواست
            </button>
            <Loading v-if="loading"/>
          </div>
        </div>
        <div
            class="d-flex flex-column align-items-center"
            v-if="showSuccessSoilExamination"
        >
          <div class="soil-examination-success-image"></div>
          <div class="soil-examination-empty-title">
            درخواست آزمایش خاک شما با موفقیت ثبت شد
          </div>
          <div class="soil-examination-empty-description">
            بزودی از جالیزان جهت هماهنگی مراجعه کارشناس با شما تماس گرفته می شود
          </div>
          <div
              class="d-flex align-items-center soil-examination-back"
              @click="showBackToSoilConsulting"
          >
            <font-awesome-icon
                class="me-2"
                icon="chevron-left"
            ></font-awesome-icon>
            <span>ارجاع به صفحه مشاوره</span>
          </div>
        </div>
        <div v-if="backToSoilConsulting === true && requestInProcess === false">
          <div>
            <div v-if="farm.soil_examination !== null">
              <div
                  class="
                  mb-3
                  d-flex
                  justify-content-between
                  align-items-center
                  back-to-soil-consulting
                "
              >
                <div
                    @click="goToSoilExaminationPage"
                    class="d-flex align-items-center pointer"
                >
                  <span class="me-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                    >
                      <g
                          id="Iconly_Light_Arrow_-_Down_2"
                          data-name="Iconly/Light/Arrow - Down 2"
                          transform="translate(12) rotate(90)"
                      >
                        <g
                            id="Arrow_-_Down_2"
                            data-name="Arrow - Down 2"
                            transform="translate(2.5 4.25)"
                        >
                          <path
                              id="Stroke_1"
                              data-name="Stroke 1"
                              d="M7,0,3.5,3.5,0,0"
                              fill="none"
                              stroke="#29bb89"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="10"
                              stroke-width="1.5"
                          />
                        </g>
                      </g>
                    </svg>
                  </span>
                  <span class="link">مشاهده آزمایش خاک</span>
                </div>
                <span class="message">{{
                    farm.soil_examination.status !== null
                        ? farm.soil_examination.status.title_fa
                        : "وضعیت نامعلوم"
                  }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
            class="d-flex flex-column align-items-center requestInProcess"
            v-if="
            requestInProcess === true && showSuccessSoilExamination === false
          "
        >
          <div class="soil-examination-in-process-image">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="327.321"
                height="233.426"
                viewBox="0 0 327.321 233.426"
            >
              <defs>
                <clipPath id="clip-path">
                  <circle
                      id="Ellipse_747"
                      data-name="Ellipse 747"
                      cx="18.656"
                      cy="18.656"
                      r="18.656"
                      fill="#fff"
                  />
                </clipPath>
              </defs>
              <g
                  id="Group_8923"
                  data-name="Group 8923"
                  transform="translate(-161.369 -416.046)"
              >
                <g
                    id="Group_8897"
                    data-name="Group 8897"
                    transform="translate(175.009 440.546)"
                >
                  <path
                      id="Path_1153"
                      data-name="Path 1153"
                      d="M1397.439,783.445l-.413-.254c23.48-38.186,35.717-72.689,36.369-102.548.674-30.88-11.3-49.761-21.462-60.163a69.516,69.516,0,0,0-35.981-19.568c-12.6-2.464-24.935-.9-33.837,4.294l-.244-.419c9-5.251,21.459-6.838,34.174-4.351a70.009,70.009,0,0,1,36.235,19.7c10.228,10.468,22.278,29.464,21.6,60.512C1433.226,710.6,1420.965,745.184,1397.439,783.445Z"
                      transform="translate(-1123.77 -588.444)"
                      fill="#fbfcff"
                      opacity="0.4"
                  />
                  <path
                      id="Path_1154"
                      data-name="Path 1154"
                      d="M547.74,603.026c-10.965-23.755-32.267-42.323-58.763-45.551-21.139-2.575-50.4-2.92-71.63-4.215-22.408-1.367-65.346-5.525-87.489-9.168-14.214-2.339-26.666,1.115-40.448,6.115-18.825,6.829-37.017,28.878-45.226,46.518-19.778,42.5-8.854,95.958,8.574,137.372.854,2.029,6.74,18.173,8.5,18.173H520.776c13.906-20.395,25.3-42.825,31.631-65.985C559.926,658.764,559.846,629.253,547.74,603.026Z"
                      transform="translate(-247.25 -543.344)"
                      fill="#f4f9f7"
                  />
                  <path
                      id="Path_1155"
                      data-name="Path 1155"
                      d="M228.689,715.91c-9.051-28.223-13.036-52.765-11.845-72.944.991-16.783,5.56-30.723,13.58-41.431C248.8,577,279.5,577.485,279.805,577.493l-.012.485c-.3-.009-30.761-.482-48.984,23.853-7.961,10.632-12.5,24.483-13.481,41.169-1.187,20.118,2.791,44.6,11.823,72.763Z"
                      transform="translate(-216.638 -570.873)"
                      fill="#fbfcff"
                      opacity="0.4"
                  />
                </g>
                <g
                    id="Group_8909"
                    data-name="Group 8909"
                    transform="translate(237.2 416.046)"
                >
                  <g
                      id="Group_8898"
                      data-name="Group 8898"
                      transform="translate(0 0)"
                  >
                    <rect
                        id="Rectangle_497"
                        data-name="Rectangle 497"
                        width="177.351"
                        height="172.837"
                        rx="20"
                        transform="translate(0 0)"
                        fill="#e7f3ee"
                    />
                  </g>
                  <g
                      id="Group_8899"
                      data-name="Group 8899"
                      transform="translate(107.331 20.137)"
                  >
                    <rect
                        id="Rectangle_498"
                        data-name="Rectangle 498"
                        width="37.796"
                        height="2.758"
                        transform="translate(11.872)"
                        fill="#6abea1"
                    />
                    <rect
                        id="Rectangle_499"
                        data-name="Rectangle 499"
                        width="60.221"
                        height="2.758"
                        transform="translate(0 11.872)"
                        fill="#84d5ae"
                    />
                    <rect
                        id="Rectangle_500"
                        data-name="Rectangle 500"
                        width="54.239"
                        height="2.758"
                        transform="translate(0 20.029)"
                        fill="#84d5ae"
                    />
                    <rect
                        id="Rectangle_501"
                        data-name="Rectangle 501"
                        width="48.01"
                        height="2.758"
                        transform="translate(0 28.186)"
                        fill="#caefda"
                    />
                    <rect
                        id="Rectangle_502"
                        data-name="Rectangle 502"
                        width="60.221"
                        height="2.758"
                        transform="translate(0 36.342)"
                        fill="#caefda"
                    />
                    <rect
                        id="Rectangle_503"
                        data-name="Rectangle 503"
                        width="44.453"
                        height="2.758"
                        transform="translate(0 44.499)"
                        fill="#caefda"
                    />
                  </g>
                  <g
                      id="Group_8900"
                      data-name="Group 8900"
                      transform="translate(12.784 109.378)"
                  >
                    <rect
                        id="Rectangle_504"
                        data-name="Rectangle 504"
                        width="57.797"
                        height="2.758"
                        fill="#84d5ae"
                    />
                    <rect
                        id="Rectangle_505"
                        data-name="Rectangle 505"
                        width="149.442"
                        height="2.758"
                        transform="translate(0.166 7.511)"
                        fill="#84d5ae"
                    />
                  </g>
                  <g
                      id="Group_8903"
                      data-name="Group 8903"
                      transform="translate(12.875 20.137)"
                  >
                    <rect
                        id="Rectangle_506"
                        data-name="Rectangle 506"
                        width="69.601"
                        height="73.659"
                        fill="#fff"
                    />
                    <g
                        id="Group_8901"
                        data-name="Group 8901"
                        transform="translate(6.294 15.829)"
                    >
                      <rect
                          id="Rectangle_507"
                          data-name="Rectangle 507"
                          width="4.839"
                          height="16.94"
                          transform="translate(0 32.829)"
                          fill="#84d5ae"
                      />
                      <rect
                          id="Rectangle_508"
                          data-name="Rectangle 508"
                          width="4.839"
                          height="14.552"
                          transform="translate(8.696 35.217)"
                          fill="#e0e0ff"
                      />
                      <rect
                          id="Rectangle_509"
                          data-name="Rectangle 509"
                          width="4.839"
                          height="23.781"
                          transform="translate(17.391 25.988)"
                          fill="#84d5ae"
                      />
                      <rect
                          id="Rectangle_510"
                          data-name="Rectangle 510"
                          width="4.839"
                          height="22.078"
                          transform="translate(26.087 27.691)"
                          fill="#caefda"
                      />
                      <rect
                          id="Rectangle_511"
                          data-name="Rectangle 511"
                          width="4.839"
                          height="29.699"
                          transform="translate(34.783 20.07)"
                          fill="#84d5ae"
                      />
                      <rect
                          id="Rectangle_512"
                          data-name="Rectangle 512"
                          width="4.839"
                          height="33.817"
                          transform="translate(43.478 15.952)"
                          fill="#caefda"
                      />
                      <rect
                          id="Rectangle_513"
                          data-name="Rectangle 513"
                          width="4.839"
                          height="37.488"
                          transform="translate(52.174 12.281)"
                          fill="#84d5ae"
                      />
                      <path
                          id="Path_1157"
                          data-name="Path 1157"
                          d="M651.374,626.041l-9.139-3.655.175-.436,8.879,3.552,9.048-7.488,8.44.2,25.44-15.71.247.4L668.9,618.683l-8.4-.2Z"
                          transform="translate(-641.104 -602.5)"
                          fill="#caefda"
                      />
                    </g>
                    <g
                        id="Group_8902"
                        data-name="Group 8902"
                        transform="translate(5.413 14.593)"
                    >
                      <rect
                          id="Rectangle_514"
                          data-name="Rectangle 514"
                          width="9.928"
                          height="4.128"
                          fill="#caefda"
                      />
                      <rect
                          id="Rectangle_515"
                          data-name="Rectangle 515"
                          width="9.287"
                          height="0.485"
                          transform="translate(13.209 2.367)"
                          fill="#caefda"
                      />
                    </g>
                  </g>
                  <g
                      id="Group_8905"
                      data-name="Group 8905"
                      transform="translate(108.802 77.153)"
                  >
                    <circle
                        id="Ellipse_744"
                        data-name="Ellipse 744"
                        cx="10.839"
                        cy="10.839"
                        r="10.839"
                        transform="translate(30.886 0.001)"
                        fill="#fff"
                    />
                    <g id="Group_8904" data-name="Group 8904">
                      <path
                          id="Path_1158"
                          data-name="Path 1158"
                          d="M1109.673,836.674A10.842,10.842,0,0,1,1108,815.121a11.081,11.081,0,0,1,1.677-.127,10.84,10.84,0,0,1,0,21.68Z"
                          transform="translate(-1098.835 -814.994)"
                          fill="#fff"
                      />
                      <path
                          id="Path_1159"
                          data-name="Path 1159"
                          d="M1147.775,825.836l-1.677-10.715a11.083,11.083,0,0,1,1.677-.127,10.793,10.793,0,0,1,8.068,3.609Z"
                          transform="translate(-1136.937 -814.994)"
                          fill="#6abea1"
                      />
                    </g>
                  </g>
                  <g
                      id="Group_8908"
                      data-name="Group 8908"
                      transform="translate(14.056 129.968)"
                  >
                    <g id="Group_8906" data-name="Group 8906">
                      <rect
                          id="Rectangle_516"
                          data-name="Rectangle 516"
                          width="148.739"
                          height="28.589"
                          fill="#fff"
                      />
                    </g>
                    <g
                        id="Group_8907"
                        data-name="Group 8907"
                        transform="translate(0.072 0.064)"
                    >
                      <path
                          id="Path_1160"
                          data-name="Path 1160"
                          d="M759.491,1116.766h-149.1v-28.953h149.1Zm-148.735-.363H759.127v-28.226H610.755Z"
                          transform="translate(-610.392 -1087.813)"
                          fill="#6abea1"
                      />
                      <rect
                          id="Rectangle_517"
                          data-name="Rectangle 517"
                          width="148.735"
                          height="0.363"
                          transform="translate(0.182 22.872)"
                          fill="#6abea1"
                      />
                      <rect
                          id="Rectangle_518"
                          data-name="Rectangle 518"
                          width="148.735"
                          height="0.363"
                          transform="translate(0.182 17.154)"
                          fill="#6abea1"
                      />
                      <rect
                          id="Rectangle_519"
                          data-name="Rectangle 519"
                          width="148.735"
                          height="0.363"
                          transform="translate(0.182 11.435)"
                          fill="#6abea1"
                      />
                      <rect
                          id="Rectangle_520"
                          data-name="Rectangle 520"
                          width="148.735"
                          height="0.363"
                          transform="translate(0.182 5.718)"
                          fill="#6abea1"
                      />
                      <rect
                          id="Rectangle_521"
                          data-name="Rectangle 521"
                          width="0.363"
                          height="28.589"
                          transform="translate(123.946 0.182)"
                          fill="#6abea1"
                      />
                      <rect
                          id="Rectangle_522"
                          data-name="Rectangle 522"
                          width="0.363"
                          height="28.589"
                          transform="translate(99.157 0.182)"
                          fill="#6abea1"
                      />
                      <rect
                          id="Rectangle_523"
                          data-name="Rectangle 523"
                          width="0.363"
                          height="28.589"
                          transform="translate(74.368 0.182)"
                          fill="#6abea1"
                      />
                      <rect
                          id="Rectangle_524"
                          data-name="Rectangle 524"
                          width="0.363"
                          height="28.589"
                          transform="translate(49.578 0.182)"
                          fill="#6abea1"
                      />
                      <rect
                          id="Rectangle_525"
                          data-name="Rectangle 525"
                          width="0.363"
                          height="28.589"
                          transform="translate(24.789 0.182)"
                          fill="#6abea1"
                      />
                    </g>
                    <path
                        id="Path_1161"
                        data-name="Path 1161"
                        d="M630.478,1131.315c2.162-3.013,2.63-6.892,4.561-10.063a8.719,8.719,0,0,1,3.916-3.774c2.975-1.193,3.734,2.647,3.8,4.78.093,3.137-.427,6.54,2.164,8.9a3.432,3.432,0,0,0,3.177.943,5.425,5.425,0,0,0,2.964-2.832c1.983-3.372,3.243-7.237,4.621-10.884.7-1.843,1.581-4.2,3.4-5.235,2.6-1.472,2.883,1.785,2.876,3.5-.007,1.88.013,3.76.029,5.641.008.9-.178,2.789.884,3.293.625.3,1.12-.27,1.471-.724.3-.4.517-.858.821-1.251a1.348,1.348,0,0,1,1.058-.637c.475-.039.7-.045,1.024.392a2.622,2.622,0,0,1,.339.872c.374,1.41-.01,3.008.789,4.312a2.569,2.569,0,0,0,2.3,1.307c1.816-.287,2.277-3.246,2.495-4.668a46.672,46.672,0,0,1,1.088-5.652c.528-1.87,1.212-4.1,2.635-5.5a2.752,2.752,0,0,1,2.088-.974c1.17.131,1.536,1.452,1.822,2.4a22.9,22.9,0,0,1,1.03,6.608c0,1.544-.45,3.476.579,4.812a2.355,2.355,0,0,0,2.385.905c1.31-.327,1.626-1.6,1.892-2.751a4.844,4.844,0,0,1,.179-.686c.255-.65.357-.726,1.058-.754.772-.032.8.149.926.789a18.294,18.294,0,0,0,.254,1.933c.245.806.812,1.548,1.745,1.27a2.894,2.894,0,0,0,1.607-1.956c.818-2.237.742-4.715.864-7.056a11.51,11.51,0,0,1,.922-4.625c.466-.916,1.843-2.4,2.906-1.433,1.385,1.258,1.25,4.323,1.281,6.014.068,3.63-.541,7.275-.034,10.893.19,1.353.574,3.373,2.075,3.885,2.079.709,3.611-1.555,4.163-3.211.439-1.317.54-2.695.852-4.039.164-.706.416-2,1.381-1.594.832.347,1.175,1.524,1.906,2.056,2.362,1.718,3.808-1.633,4.086-3.447.406-2.651-.012-5.572.98-8.108a3.588,3.588,0,0,1,1.234-1.71c1.443-.95,2.864.364,3.3,1.708a11.21,11.21,0,0,1,.287,3.221c.021,1.148.052,2.3.073,3.445.035,1.9-.135,3.833-.013,5.724a3.994,3.994,0,0,0,1.717,3.252c2.85,1.862,6.182-1.043,8-3.081a24.5,24.5,0,0,0,4.525-7.956,21.769,21.769,0,0,1,1.927-4.269c.464-.723,1.754-2.456,2.813-1.978.689.312.919,1.559,1.067,2.2a23.031,23.031,0,0,1,.46,3.305c.171,2.108.184,4.221.222,6.334.033,1.789.184,4.488,2.173,5.212,3.105,1.131,4.587-3.316,5.446-5.37.712-1.7,1.58-4.009,3.236-5.021,1.408-.86,2.388.467,2.909,1.647a9.352,9.352,0,0,1,.772,3.623c.011.862-.056,1.942.888,2.358,2.061.908,3.938-2.5,4.739-3.844.73-1.225,1.285-2.508,1.9-3.793.769-1.614,3.287-4.7,4.334-1.607a9.387,9.387,0,0,1,.179,3.634c-.088,1.368-.186,2.74-.143,4.112.05,1.585.337,5.042,2.728,4.675,1.449-.222,2.941-1.818,4.027-2.724a52.826,52.826,0,0,0,4.515-4.254c.214-.226-.127-.569-.343-.343a52.89,52.89,0,0,1-4.515,4.254,32.791,32.791,0,0,1-2.639,2.051,1.752,1.752,0,0,1-2.846-.794c-.938-2.424-.367-5.423-.241-7.945.075-1.5-.113-4.933-2.411-4.517-1.377.25-2.327,1.734-2.9,2.879-.652,1.3-1.186,2.635-1.92,3.894a10.885,10.885,0,0,1-2.78,3.573c-.915.632-1.986.333-2.088-.9-.047-.561.014-1.119-.053-1.682-.191-1.627-.81-4.314-2.571-4.973-2.444-.914-4.224,3.2-4.92,4.808-.712,1.648-1.264,3.759-2.58,5.045a2.324,2.324,0,0,1-3.383.173,5.212,5.212,0,0,1-.966-2.962c-.377-3.83.194-7.787-.9-11.542-.315-1.083-.915-2.421-2.255-1.946-2.247.8-3.27,3.714-4.035,5.726a25.951,25.951,0,0,1-4.965,8.849c-1.376,1.475-3.37,3.3-5.523,3.254-2.826-.057-3.178-2.877-3.1-5.038.079-2.113,0-4.233-.05-6.346-.037-1.7.192-3.732-.648-5.29a2.849,2.849,0,0,0-2.844-1.575,3.287,3.287,0,0,0-2.137,1.976c-1.082,2.319-.8,5.117-1.04,7.6-.14,1.417-.392,3.849-2.051,4.342-2.087.621-2.153-2.516-3.909-2.576-1.861-.063-1.877,4.407-2.2,5.583-.4,1.451-1.152,3.183-2.805,3.5a1.89,1.89,0,0,1-2.1-1.327c-.9-2-.792-4.517-.736-6.658.042-1.6.185-3.194.213-4.794.03-1.724.373-9.132-2.916-8.338-2.276.55-2.858,3.488-3.06,5.435-.27,2.594-.042,5.252-.782,7.786a3.673,3.673,0,0,1-1,1.867,1.011,1.011,0,0,1-1.542-.533,4.028,4.028,0,0,1-.221-1.355c-.064-.738-.157-1.835-.978-2.145-.95-.358-1.729.613-2.015,1.393-.354.967-.239,2.237-1.22,2.878a1.844,1.844,0,0,1-2.617-.915,6.632,6.632,0,0,1-.268-3.264,20.25,20.25,0,0,0-.122-3.241,19.359,19.359,0,0,0-1.3-5.515c-1.035-2.33-3.34-1.71-4.712-.037-2.329,2.842-2.915,7.162-3.42,10.667a11.165,11.165,0,0,1-.879,3.32c-.258.527-.628,1.151-1.255,1.257-1.049.178-1.918-1.032-2.148-1.892-.374-1.4-.021-6.358-2.932-4.835-.9.472-.99,1.6-1.761,2.168-1.205.887-1.279-1.074-1.288-1.833-.013-1.139-.019-2.277-.029-3.416a41.427,41.427,0,0,0-.083-4.638,2.823,2.823,0,0,0-1.418-2.5c-2.713-1.084-4.738,3.3-5.466,5.132-1.544,3.894-2.781,8.055-4.953,11.657-1.193,1.978-3.226,3.46-5.269,1.608a6.99,6.99,0,0,1-2.035-5.17c-.05-2.474.691-7.476-2.275-8.762-2.584-1.121-5.324,2.444-6.417,4.278-1.868,3.133-2.351,6.958-4.473,9.915-.182.254.238.5.419.245Z"
                        transform="translate(-626.139 -1107.007)"
                        fill="#b5e2c7"
                    />
                  </g>
                </g>
                <g
                    id="Group_8915"
                    data-name="Group 8915"
                    transform="translate(235.199 445.631)"
                >
                  <g
                      id="Group_8910"
                      data-name="Group 8910"
                      transform="translate(0 30.824)"
                  >
                    <path
                        id="Path_1162"
                        data-name="Path 1162"
                        d="M581.741,734.4l-4.346,2.544-46.2,27.072c-1.421.833-3.086.637-3.745-.443l0,0c-.66-1.08-.074-2.65,1.317-3.534l45.1-28.675L578.2,728.6Z"
                        transform="translate(-527.177 -728.605)"
                        fill="#6abea1"
                    />
                    <path
                        id="Path_1163"
                        data-name="Path 1163"
                        d="M775.916,734.4l-4.345,2.544a13.716,13.716,0,0,1-2.222-2.765,13.926,13.926,0,0,1-1.312-2.819l4.339-2.759Z"
                        transform="translate(-721.351 -728.605)"
                        fill="#45ad85"
                    />
                  </g>
                  <path
                      id="Path_1164"
                      data-name="Path 1164"
                      d="M768,754.8a1.453,1.453,0,1,1,.483-2A1.453,1.453,0,0,1,768,754.8Z"
                      transform="translate(-719.537 -716.724)"
                      fill="#fff"
                  />
                  <circle
                      id="Ellipse_745"
                      data-name="Ellipse 745"
                      cx="23"
                      cy="23"
                      r="23"
                      transform="translate(47.357)"
                      fill="#6abea1"
                  />
                  <g
                      id="Group_8914"
                      data-name="Group 8914"
                      transform="translate(51.7 4.344)"
                  >
                    <circle
                        id="Ellipse_746"
                        data-name="Ellipse 746"
                        cx="18.656"
                        cy="18.656"
                        r="18.656"
                        fill="#fff"
                    />
                    <g
                        id="Group_8913"
                        data-name="Group 8913"
                        clip-path="url(#clip-path)"
                    >
                      <g
                          id="Group_8911"
                          data-name="Group 8911"
                          transform="translate(5.224 15.146)"
                      >
                        <rect
                            id="Rectangle_526"
                            data-name="Rectangle 526"
                            width="5.848"
                            height="35.89"
                            transform="translate(0 9.816)"
                            fill="#84d5ae"
                        />
                        <rect
                            id="Rectangle_527"
                            data-name="Rectangle 527"
                            width="5.848"
                            height="40.866"
                            transform="translate(10.508 5.083)"
                            fill="#caefda"
                        />
                        <rect
                            id="Rectangle_528"
                            data-name="Rectangle 528"
                            width="5.848"
                            height="45.302"
                            transform="translate(21.017)"
                            fill="#84d5ae"
                        />
                      </g>
                      <g
                          id="Group_8912"
                          data-name="Group 8912"
                          transform="translate(-1.24 7.297)"
                      >
                        <rect
                            id="Rectangle_529"
                            data-name="Rectangle 529"
                            width="28.132"
                            height="0.727"
                            transform="translate(0 9.566) rotate(-17.738)"
                            fill="#caefda"
                        />
                        <path
                            id="Path_1165"
                            data-name="Path 1165"
                            d="M911.4,634.094l-.592-.422,1.765-2.478-2.556-.874.236-.688,2.822.966a.5.5,0,0,1,.331.337.508.508,0,0,1-.1.48Zm1.436-2.809.023.008Zm-.1-.316a.085.085,0,0,0-.011.015Z"
                            transform="translate(-886.273 -629.633)"
                            fill="#caefda"
                        />
                      </g>
                    </g>
                  </g>
                </g>
                <g
                    id="Group_8922"
                    data-name="Group 8922"
                    transform="translate(202.347 466.589)"
                >
                  <g
                      id="Group_8918"
                      data-name="Group 8918"
                      transform="translate(0 60.773)"
                  >
                    <g
                        id="Group_8916"
                        data-name="Group 8916"
                        transform="translate(47.315 103.455)"
                    >
                      <path
                          id="Path_1166"
                          data-name="Path 1166"
                          d="M611.812,1534.018c-2.927.044-7.123.111-9.837.15.029-1.313.077-2.621.136-3.818.131-2.985.3-5.291.3-5.291L610.8,1525s-.039.833,0,2.084A26.723,26.723,0,0,0,611.812,1534.018Z"
                          transform="translate(-601.939 -1525)"
                          fill="#ffbc96"
                      />
                      <path
                          id="Path_1167"
                          data-name="Path 1167"
                          d="M614.912,1575.622c-1.609-.5-2.616-2.141-3.247-4.1l-9.841.152a50.45,50.45,0,0,0,.251,7.947,1.569,1.569,0,0,0,1.546,1.312h14.415a2.027,2.027,0,0,0,2.067-2.151C619.957,1577.381,618.308,1576.673,614.912,1575.622Z"
                          transform="translate(-601.79 -1562.503)"
                          fill="#93a39d"
                      />
                      <path
                          id="Path_1168"
                          data-name="Path 1168"
                          d="M611.363,1527.084l-8.688,3.266c.131-2.985.3-5.291.3-5.291l8.388-.058S611.325,1525.833,611.363,1527.084Z"
                          transform="translate(-602.504 -1525)"
                          fill="#d28572"
                      />
                      <path
                          id="Path_1169"
                          data-name="Path 1169"
                          d="M606.587,1602.993a4.368,4.368,0,0,0-1.817-3.019,3.45,3.45,0,0,0-2.482-.352l-.134-.466a3.873,3.873,0,0,1,2.86.4,4.815,4.815,0,0,1,2.047,3.337Z"
                          transform="translate(-602.083 -1584.692)"
                          fill="#656590"
                      />
                    </g>
                    <g
                        id="Group_8917"
                        data-name="Group 8917"
                        transform="translate(0 98.968)"
                    >
                      <path
                          id="Path_1170"
                          data-name="Path 1170"
                          d="M382.629,1504.767a35.556,35.556,0,0,0-1.6,4.822,21.118,21.118,0,0,0-.644,3.969c-2.757-.993-6.7-2.418-9.26-3.344,1.187-2.917,2.457-5.776,3.14-7.278l.019-.039c.3-.659.475-1.047.475-1.047Z"
                          transform="translate(-368.519 -1501.85)"
                          fill="#ffbc96"
                      />
                      <path
                          id="Path_1171"
                          data-name="Path 1171"
                          d="M371.132,1553.34c-1.329-1.035-1.689-2.929-1.585-4.987l-9.257-3.341a50.469,50.469,0,0,0-2.578,7.521,1.569,1.569,0,0,0,.981,1.775l13.482,5.1a2.027,2.027,0,0,0,2.694-1.28C375.228,1556.77,373.936,1555.525,371.132,1553.34Z"
                          transform="translate(-357.682 -1536.646)"
                          fill="#93a39d"
                      />
                      <path
                          id="Path_1172"
                          data-name="Path 1172"
                          d="M394.58,1504.767a35.551,35.551,0,0,0-1.6,4.822l-7.031-5.917.266-.737.019-.039c.3-.659.475-1.047.475-1.047Z"
                          transform="translate(-380.471 -1501.85)"
                          fill="#d28572"
                      />
                      <path
                          id="Path_1173"
                          data-name="Path 1173"
                          d="M365.947,1572.291l-.43-.224a3.716,3.716,0,0,0-1.512-5.246l.224-.43A4.248,4.248,0,0,1,365.947,1572.291Z"
                          transform="translate(-362.779 -1553.882)"
                          fill="#656590"
                      />
                    </g>
                    <path
                        id="Path_1174"
                        data-name="Path 1174"
                        d="M536.739,1096.4l-15.424,1.211-3.232-55.081-4.778-18.108-6.251-23.681-.325-1.236-1.507-5.708-.223-.853,2.951-.266,15.947-1.43.964,4.361v.005l9.551,43.189a23.55,23.55,0,0,1,.543,4.279Z"
                        transform="translate(-476.446 -991.25)"
                        fill="#6abea1"
                    />
                    <path
                        id="Path_1175"
                        data-name="Path 1175"
                        d="M408.721,1019.223l-1.226,12.255-1.987,19.838a27.8,27.8,0,0,1-1.517,6.692l-16.432,45.447-13.81-5.33,12.841-46.518c3.31-19.15,2.762-33.847,3.615-43.17.053-.581.111-1.139.174-1.677a19.044,19.044,0,0,1,1.783-6.76l7.249.853,5.107.6,1.11,4.7.223.95Z"
                        transform="translate(-370.636 -998.304)"
                        fill="#6abea1"
                    />
                    <path
                        id="Path_1176"
                        data-name="Path 1176"
                        d="M487.5,995.611l.166,1.858s-21.644,5.815-29.013,3.914c.053-.582.111-1.139.174-1.677a19.041,19.041,0,0,1,1.783-6.76l7.249.853-.223-.853,2.951-.266,15.947-1.43Z"
                        transform="translate(-439.08 -991.25)"
                        fill="#45af86"
                    />
                    <path
                        id="Path_1177"
                        data-name="Path 1177"
                        d="M516.534,1128.5l-7.235-28.58-5.929-1.9.148-.462,6.185,1.979.033.13,7.268,28.71Z"
                        transform="translate(-475.131 -1076.953)"
                        fill="#265e48"
                    />
                    <path
                        id="Path_1178"
                        data-name="Path 1178"
                        d="M627.856,1250.292l-.171-.453a33.912,33.912,0,0,0,5.89-2.763l.263.407A33.708,33.708,0,0,1,627.856,1250.292Z"
                        transform="translate(-575.351 -1197.489)"
                        fill="#265e48"
                    />
                    <path
                        id="Path_1179"
                        data-name="Path 1179"
                        d="M502.61,1281.224a52.977,52.977,0,0,1-7.307-1.339l.125-.469a52.5,52.5,0,0,0,7.23,1.326Z"
                        transform="translate(-468.628 -1223.562)"
                        fill="#265e48"
                    />
                    <rect
                        id="Rectangle_530"
                        data-name="Rectangle 530"
                        width="0.485"
                        height="14.973"
                        transform="translate(4.242 96.091) rotate(-69.805)"
                        fill="#265e48"
                    />
                    <rect
                        id="Rectangle_531"
                        data-name="Rectangle 531"
                        width="15.424"
                        height="0.485"
                        transform="translate(44.649 102.12) rotate(-4.03)"
                        fill="#265e48"
                    />
                  </g>
                  <path
                      id="Path_1180"
                      data-name="Path 1180"
                      d="M429.556,819.167,423,821.805a7.709,7.709,0,0,0-4.223,4.153l-5.5,13.167a6.56,6.56,0,0,0,1.814,7.535h0a6.56,6.56,0,0,0,6.5,1.151l4.651-1.71Z"
                      transform="translate(-402.092 -791.748)"
                      fill="#f99746"
                  />
                  <g
                      id="Group_8919"
                      data-name="Group 8919"
                      transform="translate(64.674 15.328)"
                  >
                    <path
                        id="Path_1181"
                        data-name="Path 1181"
                        d="M724.023,756.914c-1.225.605-2.638,3.182-2.1,4.109.439.76,1.462-.268,1.8-.621.62-.648,2.22-2.378,1.337-3.361A.8.8,0,0,0,724.023,756.914Z"
                        transform="translate(-715.902 -756.786)"
                        fill="#ffbc96"
                    />
                    <path
                        id="Path_1182"
                        data-name="Path 1182"
                        d="M712.758,761.081c-1.017.913-1.684,3.775-.918,4.524.628.613,1.336-.652,1.566-1.083.423-.791,1.5-2.888.383-3.6A.8.8,0,0,0,712.758,761.081Z"
                        transform="translate(-707.602 -760.022)"
                        fill="#ffbc96"
                    />
                    <path
                        id="Path_1183"
                        data-name="Path 1183"
                        d="M702.34,768.512c-1.027.881-1.75,3.589-1.008,4.277.608.564,1.338-.643,1.575-1.053.436-.753,1.547-2.75.457-3.393A.838.838,0,0,0,702.34,768.512Z"
                        transform="translate(-699.153 -766.014)"
                        fill="#ffbc96"
                    />
                    <path
                        id="Path_1184"
                        data-name="Path 1184"
                        d="M692.666,771.968c-1.027.881-1.75,3.59-1.008,4.277.608.564,1.338-.643,1.575-1.053.436-.753,1.547-2.75.457-3.393A.838.838,0,0,0,692.666,771.968Z"
                        transform="translate(-691.353 -768.801)"
                        fill="#ffbc96"
                    />
                  </g>
                  <path
                      id="Path_1185"
                      data-name="Path 1185"
                      d="M460.6,813.2l-6.824,11.732s1.777,19.383.485,21.764-4.2,4.25-2.423,5.611,15.829,3.74,31.012.17c4.2-1.19,1.292-3.4.323-4.421s-2.261-26.694-2.261-26.694l-8.732-7.956-6.452-1.735Z"
                      transform="translate(-433.138 -785.702)"
                      fill="#f99746"
                  />
                  <path
                      id="Path_1186"
                      data-name="Path 1186"
                      d="M507.859,815.839c-1.211,2.12-15.47,4.3-11.448-.283l4.119-.868Z"
                      transform="translate(-468.947 -788.137)"
                      fill="#1b1b43"
                      opacity="0.2"
                  />
                  <g
                      id="Group_8920"
                      data-name="Group 8920"
                      transform="translate(39.053 20.713)"
                  >
                    <path
                        id="Path_1187"
                        data-name="Path 1187"
                        d="M577.5,834.435l-5.626-8.345A8.97,8.97,0,0,0,566,822l-6.833-1.372,4.038,15.143s6.3,8.843,11.993,10.9c5.11,1.848,11.887-1.187,15.624-21.16l-8.473-1.155Z"
                        transform="translate(-559.167 -813.637)"
                        fill="#f99746"
                    />
                    <path
                        id="Path_1188"
                        data-name="Path 1188"
                        d="M691.892,784.575c-.856-.109-3.8,4.321-3.8,4.321l-4.75,1.618a6.852,6.852,0,0,0-3.966,3.515l-.607,1.262,8.473,1.155c.139-.745.276-1.508.407-2.3C690.56,791.52,693.79,784.817,691.892,784.575Z"
                        transform="translate(-655.59 -784.573)"
                        fill="#ffbc96"
                    />
                  </g>
                  <g
                      id="Group_8921"
                      data-name="Group 8921"
                      transform="translate(23.767 0)"
                  >
                    <path
                        id="Path_1189"
                        data-name="Path 1189"
                        d="M557.731,724.039l1.718,2.377a.746.746,0,0,1-.377,1.141l-1.834.708-1.294-2.873Z"
                        transform="translate(-541.283 -715.059)"
                        fill="#d28572"
                    />
                    <path
                        id="Path_1190"
                        data-name="Path 1190"
                        d="M507.85,755a72.551,72.551,0,0,0,.257-8.751l7.831.567a23.424,23.424,0,0,0-.044,2.68,35.94,35.94,0,0,0,.436,4.279c.121.771.262,1.526.412,2.253Z"
                        transform="translate(-502.511 -732.965)"
                        fill="#ffbc96"
                    />
                    <path
                        id="Path_1191"
                        data-name="Path 1191"
                        d="M532.514,767.037a9.085,9.085,0,0,1-4.589-4.337l4.153.058A35.953,35.953,0,0,0,532.514,767.037Z"
                        transform="translate(-518.695 -746.226)"
                        fill="#d28572"
                    />
                    <path
                        id="Path_1192"
                        data-name="Path 1192"
                        d="M501.016,791.388l-1.641,5.384a28.688,28.688,0,0,0,11.589.283l-1.054-4.639Z"
                        transform="translate(-495.679 -769.354)"
                        fill="#fff5e8"
                    />
                    <path
                        id="Path_1193"
                        data-name="Path 1193"
                        d="M514.789,698.294l.811,10.835a1.493,1.493,0,0,1-.611,1.262,3.533,3.533,0,0,1-2.567.894l-5.548-.23-3.957-4.442,3.069-9.449,5.572-.081Z"
                        transform="translate(-498.534 -693.327)"
                        fill="#ffbc96"
                    />
                    <path
                        id="Path_1194"
                        data-name="Path 1194"
                        d="M487.453,689.115s1.454,4.543-1.635,6.844c-3.331-1.09-9.51-11.205-1.817-14.416a6.048,6.048,0,0,1,7.874-3.392C496.954,679.916,498.3,683,498.3,683a7.187,7.187,0,0,1-7.753.182S490.966,688.57,487.453,689.115Z"
                        transform="translate(-480.304 -677.707)"
                        fill="#1b1b43"
                    />
                    <path
                        id="Path_1195"
                        data-name="Path 1195"
                        d="M509.883,722.707a2.373,2.373,0,1,1-3.475-.544A2.494,2.494,0,0,1,509.883,722.707Z"
                        transform="translate(-500.684 -713.155)"
                        fill="#ffbc96"
                    />
                    <path
                        id="Path_1196"
                        data-name="Path 1196"
                        d="M514.183,731.968c-.02-.079-.5-1.926-1.8-1.643l-.077-.356c1.315-.285,2.038,1.125,2.234,1.911Z"
                        transform="translate(-506.1 -719.809)"
                        fill="#1b1b43"
                    />
                    <circle
                        id="Ellipse_748"
                        data-name="Ellipse 748"
                        cx="1.615"
                        cy="1.615"
                        r="1.615"
                        transform="matrix(0.23, -0.973, 0.973, 0.23, 11.485, 12.952)"
                        fill="#fe5b52"
                        opacity="0.4"
                    />
                  </g>
                  <path
                      id="Path_1197"
                      data-name="Path 1197"
                      d="M452.382,908.351c-1.47-.35-2.3-.9-2.542-1.668-.392-1.258.908-2.7,2.054-3.971.179-.2.352-.39.51-.573a2.813,2.813,0,0,0,.632-1.256c1.063-5.037-.7-20.722-.716-20.88l.481-.055c.073.648,1.788,15.921.709,21.034a3.3,3.3,0,0,1-.739,1.473c-.161.185-.336.379-.516.58-1.007,1.117-2.261,2.508-1.951,3.5.183.587.92,1.038,2.192,1.341Z"
                      transform="translate(-431.92 -840.749)"
                      fill="#265e48"
                  />
                  <path
                      id="Path_1198"
                      data-name="Path 1198"
                      d="M605.156,931.129l-.022-.484c1.655-.074,2.668-.469,2.928-1.143s-.216-1.692-1.311-2.778a2.1,2.1,0,0,1-.565-1.037c-.871-3.916-1.8-16.861-1.808-16.992l.483-.035c.009.13.934,13.04,1.8,16.921a1.61,1.61,0,0,0,.433.8c1.256,1.246,1.762,2.417,1.422,3.3S607.045,931.045,605.156,931.129Z"
                      transform="translate(-556.563 -863.896)"
                      fill="#265e48"
                  />
                  <path
                      id="Path_1199"
                      data-name="Path 1199"
                      d="M647.437,851.019l-.435-.213,6.017-12.3,8.646,1.179-.065.48-8.3-1.132Z"
                      transform="translate(-590.924 -807.342)"
                      fill="#265e48"
                  />
                </g>
                <rect
                    id="Rectangle_532"
                    data-name="Rectangle 532"
                    width="323.69"
                    height="0.485"
                    transform="translate(165 648.988)"
                    fill="#1c5940"
                />
              </g>
            </svg>
          </div>
          <div class="soil-examination-empty-title">آزمایش در حال اجراست</div>
          <div class="soil-examination-empty-description">
            لطفا تا اجرای درخواست آزمایش منتظر بمانید
          </div>
        </div>
        <div v-if="!showConsultForm && soilConsultings.length > 0">
          <div class="grid-container" style="direction: rtl">
            <div class="row justify-content-md-center">
              <div
                  class="col-xl-6 col-12 text-center"
                  v-for="item in soilConsultings"
                  :key="item.id"
              >
                <button
                    class="PlantCounselingListBox"
                    @click="navigateSingleConsulting($event, item)"
                >
                  <div class="PlantCounselingListBoxHeader">
                    <div
                        v-if="description != null"
                        class="text-right PlantCounselingListDescription"
                    >
                      {{ shortener(item.user_description, 100) }}
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse justify-content-between">
                    <div class="text-right">
                      <span class="PlantCounselingText">وضعیت درخواست : </span>
                      <span class="PlantCounselingvalue">
                      {{
                          item.status !== null
                              ? item.status.title_fa
                              : "وضعیت نامعلوم"
                        }}</span
                      >
                    </div>
                    <div class="text-left mx-3">
                      <span class="PlantCounselingText">تاریخ درخواست :</span>
                      <span class="PlantCounselingvalue">
                      {{ $filter.moment(item.created_at, "jYYYY/jM/jD") }}</span
                      >
                    </div>
                  </div>
                </button>

              </div>
            </div>
          </div>
        </div>
        <div v-if="showConsultForm">
          <div
              class="d-flex align-items-center examination-back"
              @click="requestSoilConsult"
          >
            <font-awesome-icon
                class="me-2"
                icon="chevron-left"
            ></font-awesome-icon>
            <span> ارجاع به صفحه مشاوره خاک</span>
          </div>

          <div>
            <div class="border-bottom">
              <div class="d-flex">
                <div class="ms-auto HerbalAdviceTitle">درخواست مشاوره خاک</div>
              </div>
            </div>
            <div>
              <div class="d-flex flex-column text-end">
                <div class="HerbalAdviceText">
                  توضیحات
                  <span class="HerbalAdviceSubText">
                    (مشکل را توضیح دهید)
                  </span>
                </div>
                <div class="">
                  <textarea
                      dir="rtl"
                      class="w-100 HerbalAdvice-textarea"
                      v-model.trim="description"
                  />
                </div>
              </div>
            </div>
            <div class="text-center">
              <button
                  v-if="!loading"
                  type="button"
                  class="btn HerbalAdviceSubmit"
                  @click="submitConsultForm"
              >
                ثبت و ادامه
              </button>
              <Loading v-if="loading"/>
            </div>
          </div>
        </div>
        <div
            class="d-flex justify-content-center"
            v-if="farm.soil_examination !== null"
        >
          <button
              class="soil-examination-reRequest"
              @click="requestSoilConsult"
              v-if="!showConsultForm"
          >
            درخواست مشاوره خاک
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../../common/api";
import {globalMixin} from "../../mixins/globalMixin";

export default {
  name: "SoilExamination",
  props: {
    farm: {
      type: Object,
    },
  },
  mounted() {
    this.changeState();
    this.soilConsultings = this.farm.consultings;
  },
  mixins: [globalMixin],
  inject: ["$axios"],
  data() {
    return {
      description: "",
      consulting_description: "",
      showEmptySoilExamination: false,
      showRequestSoilExamination: false,
      showRequestSoilConsulting: false,
      showSuccessSoilExamination: false,
      backToSoilConsulting: false,
      requestInProcess: false,
      images: [],
      urls: [],
      enableConsulting: true,
      showConsultForm: false,
      loading: false,
      soilConsultings: [],
    };
  },
  watch: {
    farm() {
      this.changeState();
    },
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        this.urls.push(URL.createObjectURL(file));
        this.images.push(file);
      }
    },
    callInputMethod() {
      document.querySelector(".HerbalAdviceImageInput").click();
    },
    saveRequest() {
      this.showEmptySoilExamination = false;
      this.showRequestSoilExamination = true;
    },
    closePrivacy() {
      this.showPrivacy = false;
    },
    showedPrivacy() {
      this.showPrivacy = true;
    },
    submitSoilExamination() {
      this.loading = true;
      Api.submitSoilExamination({
        service_id: this.farm.service_id,
        service_type: this.farm.type,
        description: this.description,
        self: this,
      })
          .then((response) => {
            if (response.status === 201) {
              this.loading = false;
              this.showEmptySoilExamination = false;
              this.showRequestSoilExamination = false;
              this.showSuccessSoilExamination = true;
              this.requestInProcess = true;
              this.description = "";
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response);
            this.loading = false;
          });
    },
    showBackToSoilConsulting() {
      this.backToSoilConsulting = true;
      this.requestInProcess = true;
      this.showSuccessSoilExamination = false;
    },
    requestSoilConsult() {
      this.showConsultForm = !this.showConsultForm;
    },
    goToSoilExaminationPage() {
      this.$router.push(`/show-soil-examination/${this.farm.soil_examination.id}`);
    },
    changeState() {
      if (this.farm.type === "apartment" || this.farm.type === "greenhouse") {
        this.enableConsulting = false;
        this.backToSoilConsulting = false;
        this.requestInProcess = false;
        this.showEmptySoilExamination = false;
      } else {
        if (
            this.farm.soil_examination !== null &&
            this.farm.soil_examination !== undefined &&
            this.farm.soil_examination.status.code === 0
        ) {
          this.requestInProcess = true;
          this.enableConsulting = true;
          this.showEmptySoilExamination = false;
          this.backToSoilConsulting = false;
        } else if (
            this.farm.soil_examination !== null &&
            this.farm.soil_examination !== undefined &&
            this.farm.soil_examination.status.code !== 0
        ) {
          this.backToSoilConsulting = true;
          this.requestInProcess = false;
          this.enableConsulting = true;
          this.showEmptySoilExamination = false;
        } else {
          this.showEmptySoilExamination = true;
          this.backToSoilConsulting = false;
          this.enableConsulting = true;
          this.requestInProcess = false;
        }
      }
    },
    navigateSingleConsulting(event, item) {
      event.preventDefault();
      this.$router.push(`/show-consulting/${item.id}`);
    },
    submitConsultForm() {
      let self = this;
      let data = {
        service_type: this.farm.type,
        service_id: this.farm.service_id,
        description: this.description,
        soil_examination_id:
            this.farm.soil_examination !== null
                ? this.farm.soil_examination.id
                : null,
      };
      self.loading = true;
      Api.soilConsultingRequest({self: this, data: data})
          .then((res) => {
            if (res.status === 201) {
              self.loading = false;
              this.toastReturnTxt(res);
              this.getSingleApi()
            }
          })
          .catch((error) => {
            self.loading = false;
            this.toastReturnTxt(error.response);
          });
    },
    getSingleApi() {
      let self = this;
      Api.getServiceInformationApi({self: this, id: this.farm.service_id})
          .then((res) => {
            if (res.status === 200) {
              let data = res.data;
              self.soilConsultings = data.consultings;
              self.showConsultForm = false
            }
          })
          .catch((error) => {
            this.toastReturnTxt(error.response);
          });
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/modules/SoilConsulting/SoilExamination";
@import "src/styles/modules/SoilConsulting/HerbalAdvice";
@import "src/styles/modules/PlantCounseling/PlantCounseling";
</style>