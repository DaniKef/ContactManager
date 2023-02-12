function searchContacts(searchSelect, searchInput)
{
    const holder = []; 
    let data = JSON.parse(localStorage.getItem("dataOnSite"));
    switch(searchSelect)
    {
        case "Name":
            for(var i = 0; i < data.length; i++)
                {
                    var first = data[i].name.toString();
                    var second = searchInput.toString();
                    if(first.toLowerCase().match(second.toLowerCase()))
                    {
                        holder.push(data[i]);
                    }
                }       
        break;
        case "Company":
            for(var i = 0; i < data.length; i++)
                {
                    var first = data[i].company.toString();
                    var second = searchInput.toString();
                    if(first.toLowerCase().match(second.toLowerCase()))
                    {
                        holder.push(data[i]);
                    }
                }       
        break;
        case "Group":
            for(var i = 0; i < data.length; i++)
                {
                    var first = data[i].group.toString();
                    var second = searchInput.toString();
                    if(first.toLowerCase().match(second.toLowerCase()))
                    {
                        holder.push(data[i]);
                    }
                }       
        break;
        case "Birthday":
            for(var i = 0; i < data.length; i++)
                {
                    try
                    {
                        var first = new Date(data[i].birthday).toLocaleDateString().toString();
                        var second = searchInput.toString();
                        if(first.toLowerCase().match(second.toLowerCase()))
                        {
                            holder.push(data[i]);
                        }
                    }
                    catch (e) {
                        console.log(e);
                     }                    
                }       
        break;
        case "Phone":
            for(var i = 0; i < data.length; i++)
                {
                    var first = data[i].phone.toString();
                    var second = searchInput.toString();
                    if(first.toLowerCase().match(second.toLowerCase()))
                    {
                        holder.push(data[i]);
                    }
                }       
        break;
        case "Email":
            for(var i = 0; i < data.length; i++)
                {
                    var first = data[i].email.toString();
                    var second = searchInput.toString();
                    if(first.toLowerCase().match(second.toLowerCase()))
                    {
                        holder.push(data[i]);
                    }
                }       
        break;
        case "Address":
            for(var i = 0; i < data.length; i++)
                {
                    var first = data[i].address.toString();
                    var second = searchInput.toString();
                    if(first.toLowerCase().match(second.toLowerCase()))
                    {
                        holder.push(data[i]);
                    }
                }       
        break;
        case "Last Call":
            for(var i = 0; i < data.length; i++)
                {
                    try
                    {
                        var first = new Date(data[i].lastCall).toLocaleDateString().toString();
                        var second = searchInput.toString();
                        if(first.toLowerCase().match(second.toLowerCase()))
                        {
                            holder.push(data[i]);
                        }
                    }
                    catch (e) {
                        console.log(e);
                     }                    
                }       
        break;
        case "Addition Info":
            for(var i = 0; i < data.length; i++)
                {
                    var first = data[i].addition.toString();
                    var second = searchInput.toString();
                    if(first.toLowerCase().match(second.toLowerCase()))
                    {
                        holder.push(data[i]);
                    }
                }       
        break;
        case "Description":
            for(var i = 0; i < data.length; i++)
                {
                    var first = data[i].description.toString();
                    var second = searchInput.toString();
                    if(first.toLowerCase().match(second.toLowerCase()))
                    {
                        holder.push(data[i]);
                    }
                }       
        break;
    }
    return holder;
}
