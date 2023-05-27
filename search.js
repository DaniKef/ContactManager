function searchContacts(listOfContacts, searchInput) {
  var holder = [];
  for (var i = 0; i < listOfContacts.length; i++) {
    if (
      listOfContacts[i].name
        .toString()
        .toLowerCase()
        .match(searchInput.toString().toLowerCase()) ||
      listOfContacts[i].company
        .toString()
        .toLowerCase()
        .match(searchInput.toString().toLowerCase()) ||
      listOfContacts[i].group
        .toString()
        .toLowerCase()
        .match(searchInput.toString().toLowerCase()) ||
      new Date(listOfContacts[i].birthday)
        .toLocaleDateString()
        .toString()
        .toLowerCase()
        .match(searchInput.toString().toLowerCase()) ||
      listOfContacts[i].phone
        .toString()
        .toLowerCase()
        .match(searchInput.toString().toLowerCase()) ||
      listOfContacts[i].email
        .toString()
        .toLowerCase()
        .match(searchInput.toString().toLowerCase()) ||
      listOfContacts[i].address
        .toString()
        .toLowerCase()
        .match(searchInput.toString().toLowerCase()) ||
      new Date(listOfContacts[i].lastCall)
        .toLocaleDateString()
        .toString()
        .toLowerCase()
        .match(searchInput.toString().toLowerCase()) ||
      listOfContacts[i].addition
        .toString()
        .toLowerCase()
        .match(searchInput.toString().toLowerCase()) ||
      listOfContacts[i].description
        .toString()
        .toLowerCase()
        .match(searchInput.toString().toLowerCase())
    ) {
      holder.push(listOfContacts[i]);
    }
  }

  return holder;
}

export { searchContacts };
