type Frequency = {
  key: string;
  planKey: string;
  price: number;
  oldPrice: number;
};

type Package = {
  frequencies: Frequency[];
};

type Packages = {
  bronze?: Package;
  silver?: Package;
  gold?: Package;
};

type Domain = {
  packages: Packages;
};

type Domains = {
  [key: string]: Domain;
};

const domainData: Domains = {
  mydjlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 59.99,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 179.88,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 359.88,
          },
        ],
      },
    },
  },
  myinfluencerlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 59.88,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.99,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mystudentlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_BRONZE_MONTHLY",
            price: 1.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_BRONZE_YEARLY",
            price: 19.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_SILVER_MONTHLY",
            price: 9.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_SILVER_YEARLY",
            price: 99.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_GOLD_MONTHLY",
            price: 19.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_GOLD_YEARLY",
            price: 199.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  myrestaurantlife: {
    packages: {
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_SILVER_MONTHLY",
            price: 49.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_SILVER_YEARLY",
            price: 499.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_GOLD_MONTHLY",
            price: 99.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_GOLD_YEARLY",
            price: 999.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mybusinesslife: {
    packages: {
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_SILVER_MONTHLY",
            price: 49.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_SILVER_YEARLY",
            price: 499.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_GOLD_MONTHLY",
            price: 99.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_GOLD_YEARLY",
            price: 999.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mycheflife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_BRONZE_MONTHLY",
            price: 1.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_BRONZE_YEARLY",
            price: 19.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_SILVER_MONTHLY",
            price: 9.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_SILVER_YEARLY",
            price: 99.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_GOLD_MONTHLY",
            price: 19.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_GOLD_YEARLY",
            price: 199.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mymusiclife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mypizzalife: {
    packages: {
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_SILVER_MONTHLY",
            price: 49.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_SILVER_YEARLY",
            price: 499.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_GOLD_MONTHLY",
            price: 99.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_GOLD_YEARLY",
            price: 999.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mystorelife: {
    packages: {
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_SILVER_MONTHLY",
            price: 49.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_SILVER_YEARLY",
            price: 499.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_GOLD_MONTHLY",
            price: 99.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_GOLD_YEARLY",
            price: 999.99,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mybartendinglife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_BRONZE_MONTHLY",
            price: 1.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_BRONZE_YEARLY",
            price: 19.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_SILVER_MONTHLY",
            price: 9.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_SILVER_YEARLY",
            price: 99.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_GOLD_MONTHLY",
            price: 19.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_GOLD_YEARLY",
            price: 199.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  myfreelancerlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  myservicelife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mytemplife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_BRONZE_MONTHLY",
            price: 1.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_BRONZE_YEARLY",
            price: 19.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_SILVER_MONTHLY",
            price: 9.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_SILVER_YEARLY",
            price: 99.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_GOLD_MONTHLY",
            price: 19.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_GOLD_YEARLY",
            price: 199.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mycookinglife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_BRONZE_MONTHLY",
            price: 1.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_BRONZE_YEARLY",
            price: 19.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_SILVER_MONTHLY",
            price: 9.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_SILVER_YEARLY",
            price: 99.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_GOLD_MONTHLY",
            price: 19.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_GOLD_YEARLY",
            price: 199.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mycpalife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  myentertainmentlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mynightlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  myailife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  myclublife: {
    packages: {
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_SILVER_MONTHLY",
            price: 49.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_SILVER_YEARLY",
            price: 499.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_GOLD_MONTHLY",
            price: 99.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_GOLD_YEARLY",
            price: 999.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mymedialife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mystylistlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_BRONZE_MONTHLY",
            price: 1.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_BRONZE_YEARLY",
            price: 19.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_SILVER_MONTHLY",
            price: 9.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_SILVER_YEARLY",
            price: 99.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_GOLD_MONTHLY",
            price: 19.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_GOLD_YEARLY",
            price: 199.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mydevlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_BRONZE_MONTHLY",
            price: 1.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_BRONZE_YEARLY",
            price: 19.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_SILVER_MONTHLY",
            price: 9.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_SILVER_YEARLY",
            price: 99.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_GOLD_MONTHLY",
            price: 19.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_GOLD_YEARLY",
            price: 199.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mylatinlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_BRONZE_MONTHLY",
            price: 1.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_BRONZE_YEARLY",
            price: 19.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_SILVER_MONTHLY",
            price: 9.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_SILVER_YEARLY",
            price: 99.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_GOLD_MONTHLY",
            price: 19.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_GOLD_YEARLY",
            price: 199.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mymakerlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mysaloonLife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mybarberlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_BRONZE_MONTHLY",
            price: 1.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_BRONZE_YEARLY",
            price: 19.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_SILVER_MONTHLY",
            price: 9.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_SILVER_YEARLY",
            price: 99.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_GOLD_MONTHLY",
            price: 19.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_GOLD_YEARLY",
            price: 199.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mygymlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_BRONZE_MONTHLY",
            price: 1.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_BRONZE_YEARLY",
            price: 19.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_SILVER_MONTHLY",
            price: 9.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_SILVER_YEARLY",
            price: 99.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "SPARK_GOLD_MONTHLY",
            price: 19.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "SPARK_GOLD_YEARLY",
            price: 199.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mynitelife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mysalonlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  myworldlife: {
    packages: {
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_SILVER_MONTHLY",
            price: 49.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_SILVER_YEARLY",
            price: 499.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_GOLD_MONTHLY",
            price: 99.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_GOLD_YEARLY",
            price: 999.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  mybarlife: {
    packages: {
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_SILVER_MONTHLY",
            price: 49.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_SILVER_YEARLY",
            price: 499.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "POWER_GOLD_MONTHLY",
            price: 99.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "POWER_GOLD_YEARLY",
            price: 999.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  myeventlife: {
    packages: {
      bronze: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_BRONZE_MONTHLY",
            price: 4.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_BRONZE_YEARLY",
            price: 49.9,
            oldPrice: 0,
          },
        ],
      },
      silver: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_SILVER_MONTHLY",
            price: 14.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_SILVER_YEARLY",
            price: 149.9,
            oldPrice: 0,
          },
        ],
      },
      gold: {
        frequencies: [
          {
            key: "monthly",
            planKey: "PULSE_GOLD_MONTHLY",
            price: 29.99,
            oldPrice: 0,
          },
          {
            key: "yearly",
            planKey: "PULSE_GOLD_YEARLY",
            price: 299.9,
            oldPrice: 0,
          },
        ],
      },
    },
  },
  brandpulsesocial: {
    packages: {},
  },
};

export default domainData;
