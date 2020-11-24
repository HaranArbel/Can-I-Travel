const rules = {
  visitor: {
    static: ["get:countries", "get:user_role", "get:destinations"]
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
    static: ["delete:destination", "get:countries", "get:destinations", "get:user", "get:user_role", "post:destination", "post:user_preference"
    ]
  }
};

export default rules;