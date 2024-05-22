// nameUtils.js

const constructFullName = (firstName, lastName, otherName) => {
  let fullName = "";

  if (firstName) {
    fullName += firstName.trim();
  }

  if (lastName) {
    fullName += (fullName ? " " : "") + lastName.trim();
  }

  if (otherName) {
    fullName += (fullName ? " " : "") + otherName.trim();
  }

  return fullName;
};

export default constructFullName;
