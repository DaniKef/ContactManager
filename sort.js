function sortContacts(listOfContacts, sortType) {
  if (sortType == "Name (A-Z)") {
    listOfContacts.sort(function (a, b) {
      if (a.name.toString().toLowerCase() < b.name.toString().toLowerCase()) {
        return -1;
      }
      if (a.name.toString().toLowerCase() > b.name.toString().toLowerCase()) {
        return 1;
      }
      return 0;
    });
  } else if (sortType == "Name (Z-A)") {
    listOfContacts.sort(function (a, b) {
      if (a.name.toString().toLowerCase() > b.name.toString().toLowerCase()) {
        return -1;
      }
      if (a.name.toString().toLowerCase() < b.name.toString().toLowerCase()) {
        return 1;
      }
      return 0;
    });
  } else if (sortType == "Recent Last Call") {
    listOfContacts.sort(function (a, b) {
      let date1 = new Date(a.lastCall);
      let date2 = new Date(b.lastCall);
      if (date1 < date2) {
        return 1;
      }
      if (date1 > date2) {
        return -1;
      }
      return 0;
    });
  } else if (sortType == "Birthday") {
    listOfContacts.sort(function (a, b) {
      let date1 = new Date(a.birthday);
      let date2 = new Date(b.birthday);
      if (date1 > date2) {
        return 1;
      }
      if (date1 < date2) {
        return -1;
      }
      return 0;
    });
  }
  return listOfContacts;
}
export { sortContacts };
