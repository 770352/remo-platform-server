module.exports = async input => {
  const { getControls } = require("../../models/controls");
  const { testControls } = require("./");
  const { pushButtonTimer } = require("./buttonTimers");
  const { authMemberRole } = require("../roles");
  // console.log("VALIDATE INPUT: ", input);
  let response = {}; //response object
  let validate = false; //direct input validation
  let authAccess = false; //validate input with restricted access

  if (input.button.disabled) return (response.validated = false);

  if (input.button.access) {
    const auth = await authMemberRole(input.user, { server_id: input.server });
    if (auth) authAccess = true;
  }

  const checkInput = await getControls(input.controls_id, input.channel);
  if (checkInput && checkInput.buttons) {
    const button = checkInput.buttons.find(
      checkButton => checkButton.id === input.button.id
    );
    if (button && (!button.access || (button.access && authAccess))) {
      if (button.cooldown) {
        const checkState = await pushButtonTimer(button, checkInput.channel_id);
        //console.log("checkState for cooldown", checkState);
        if (checkState && !checkState.disabled) {
          validate = true;
        }
      } else {
        validate = true;
      }
    }
  } else {
    console.log(
      "No buttons found, validating against default controls instead"
    );
    testControls.map(button => {
      if (button.label === input.button.label) validate = true;
    });
  }

  if (validate) response.validated = true;
  if (!validate) response.validated = false;

  return response;
};
