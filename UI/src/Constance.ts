import i18next from "i18next";

const t = i18next.t;

export const DaysInWeek = [
  {
    label: "sun",
    value: "s",
  },
  {
    label: "mon",
    value: "m",
  },
  {
    label: "Tues",
    value: "t",
  },
  {
    label: "Wed",
    value: "w",
  },
  {
    label: "Thur",
    value: "th",
  },
  {
    label: "fri",
    value: "f",
  },
];

export const status = [
  {
    label: t("active"),
    value: 1,
  },
  {
    label: t("suspended"),
    value: 2,
  },
  {
    label: t("deactivated"),
    value: 3,
  },
];

export const getStatus = {
  1: t('active'),
  2: t("suspended"),
  3: t("deactivated")
}

export const gender = [
  {
    label: t("male"),
    value: 1,
  },
  {
    label: t("female"),
    value: 2,
  },
];

export const getGender = {
  1: t("male"),
  2: t("female"),
}

export const userRole = [
  {
    label: t("super admin"),
    value: 1,
  },
  {
    label: t("admin"),
    value: 2,
  },
  {
    label: t("data entry"),
    value: 3,
  },
  {
    label: t("didector"),
    value: 4,
  },
];

export const getRole = {
  1: t("super admin"),
  2: t("admin"),
  3: t("data entry"),
  4: t("didector")
}

export const maritalStatus = [
  {
    label: t("single"),
    value: 1,
  },
  {
    label: t("married"),
    value: 2,
  },
  {
    label: t("divorced"),
    value: 3,
  },
  {
    label: t("widow"),
    value: 4,
  },
];

export const getMaritalStatus = {
  1: t("single"),
  2: t("married"),
  3: t("divorced"),
  4: t("widow")
}

export const relations = [
  {
    value: "father",
    label: "Father",
  },
  {
    value: "mother",
    label: "Mother",
  },
  {
    value: "son/daughter",
    label: "Son/Daughtedr",
  },
  {
    value: "brother/sister",
    label: "Brother/Sister",
  },
  {
    //dughter
    value: "wife/husband",
    label: "Wife/husband",
  },
];


// export const categoryTypes = [
//   {
//     label: "Mony Fund",
//     value: [
//       {
//         type: 'number',
//         name: "fund_value",
//       },
//       {
//         type: "text",
//         name: "fund_note"
//       }
//     ]
//   },
//   {
//     label: "Assets",
//     value: [
//       {
//         type: 'number',
//         name: "fund_value",
//         rules: yup.number().required("Add Fund Value")
//       },
//       {
//         type: "text",
//         name: "fund_note"
//       }
//     ]
//   }
// ]