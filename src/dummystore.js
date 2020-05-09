//what should I pass into location? X, Y, Z coordinates or state code and the city?

export default {
  "users":[{
    "id":"1",
    "name":"John Doe",
    "email":"jd@gmail.com",
    "location":"?"
  },
  {
    "id":"2",
    "name":"Commander Spock",
    "email":"spock@enterprise.space",
    "location":"?"
  },
  {
    "id":"3",
    "name":"Darth Revan",
    "email":"sithlord@deathstar.com",
    "location":"?"
  },
  {
    "id":"4",
    "name":"Dwayne Johnson",
    "email":"therock@wwe.com",
    "location":"?"
  },
  {
    "id":"5",
    "name":"X Æ A-12",
    "email":"thanksdad@spacex.com",
    "location":"?"
  }],
  "stories":[{
    "story_id" : "01",
    "user_id" : "4",
    "title" : "Looking for a help with a groceries",
    "issue" : "Looking for a person, who can go to WholeFoods and buy a groceries from a list for me and arrange a non-contact delivery to my house",
    "keywords" : "help, groceries, delivery"
  },
  {
    "story_id" : "02",
    "user_id" : "1",
    "title" : "Food offer",
    "issue" : "I have a lot of plums and can deliver them to any address in a Bay Area",
    "keywords" : "food offer, delivery"
  },
  {
    "story_id" : "03",
    "user_id" : "5",
    "title" : "Rideshare",
    "issue" : "Will drive you anywhere you need, can help with moving also (I have a big Tesla Truck)",
    "keywords" : "rideshare, transportation, moving"
  }],
  "comments":[{
    "story_id" : "03",
    "user_id" : "2",
    "content" : "Can you give me a ride to Phoenix?"
  },
  {
    "story_id" : "02",
    "user_id" : "4",
    "content" : "That stuff is awesome!"
  },
  {
    "story_id" : "01",
    "user_id" : "3",
    "content" : "Join the Dark side first and I'll do that for you!"
  }],
}