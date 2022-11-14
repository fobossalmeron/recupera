export const capitalize = () => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeAll = () => {
  return string.split(" ").map(capitalize).join(" ");
};

export const createContact = async (submittedData) => {
  let { email, listIds, updateEnabled, attributes } = submittedData;

  let requestOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.SENDINBLUE_API,
    },
    body: JSON.stringify({
      updateEnabled: updateEnabled,
      email: email,
      listIds: listIds,
      attributes: {
        ...attributes,
      },
    }),
  };
  const response = await fetch(
    "https://api.sendinblue.com/v3/contacts",
    requestOptions
  );
  console.log(requestOptions);
  const data = await response;
  return data;
};

export const updateContact = async () => {
  let { email, listIds, unlinkListIds } = submittedData;
  let requestOptions = {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.SENDINBLUE_API,
    },
    body: JSON.stringify({
      listIds: listIds,
      unlinkListIds: unlinkListIds,
    }),
  };

  const response = await fetch(
    `https://api.sendinblue.com/v3/contacts/${email}`,
    requestOptions
  );

  const data = await response;
  return data;
};
