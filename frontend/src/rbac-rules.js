const rules = {
  visitor: {
    static: ["get:countries"]
  },
  // writer: {
  //   static: [
  //     "posts:list",
  //     "posts:create",
  //     "users:getSelf",
  //     "home-page:visit",
  //     "dashboard-page:visit"
  //   ],
  //   dynamic: {
  //     "posts:edit": ({userId, postOwnerId}) => {
  //       if (!userId || !postOwnerId) return false;
  //       return userId === postOwnerId;
  //     }
  //   }
  // },
  admin: {
    static: ["edit:country", "get:countries", "create:country",
    ]
  }
};

export default rules;