export const SurveyJson = {
    "completedHtml": "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
    "completedHtmlOnCondition": [
      {
        "expression": "{nps_score} > 8",
        "html": "<h3>Thank you for your feedback.</h3> <h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>"
      }, {
        "expression": "{nps_score} < 7",
        "html": "<h3>Thank you for your feedback.</h3> <h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5><br/>"
      }
    ],
    "pages": [
      {
        "name": "page1",
        "elements": [
          {
            "type": "rating",
            "name": "nps_score",
            "title": "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            "isRequired": true,
            "rateMin": 0,
            "rateMax": 10,
            "minRateDescription": "(Most unlikely)",
            "maxRateDescription": "(Most likely)"
          }, {
            "type": "checkbox",
            "name": "promoter_features",
            "visibleIf": "{nps_score} >= 9",
            "title": "Which features do you value the most?",
            "isRequired": true,
            "validators": [
              {
                "type": "answercount",
                "text": "Please select two features maximum.",
                "maxCount": 2
              }
            ],
            "hasOther": true,
            "choices": [
              "Performance", "Stability", "User Interface", "Complete Functionality"
            ],
            "otherText": "Other feature:",
            "colCount": 2
          }, {
            "type": "comment",
            "name": "passive_experience",
            "visibleIf": "{nps_score} > 6  and {nps_score} < 9",
            "title": "What do you like about our product?"
          }, {
            "type": "comment",
            "name": "disappointed_experience",
            "visibleIf": "{nps_score} notempty",
            "title": "What do you miss or find disappointing in your experience with our products?"
          }
        ]
      }
    ],
    "showQuestionNumbers": "off"
  };

export const RatingArray = [1,2,3,4,5]
export const productRevivew = ["High quality","Poor quality","Overpriced","Good value for money"]
export const userRatings = ["Satisfied", "Dissatisfied", "Neither satisfied nor dissatisfied"]
export const sampleVisualzieddata = [
  {
    // _id: ObjectId("62c31c1a218be8ba2e7ddbeb"),
    title: 'Sample',
    body: 'This is the first Email',
    subject: 'samplesubjectline',
    recipients: [
      {
        email: 'mkr.dasari@gmail.com',
        userRating: 5,
        productReview: [ 'Highe quality', 'Good value for money' ],
        userReview: 'Satisfied',
        productDesc: 'Good',
        responded: true,
        // _id: ObjectId("62c31c1a218be8ba2e7ddbec"),
        // lastResponded: ISODate("2022-07-04T16:58:02.544Z")
      },
      {
        email: 'satishalapati502@gmail.com',
        userRating: 5,
        productReview: [ 'Highe quality', 'Good value for money' ],
        userReview: 'Dissatisfied',
        productDesc: 'Good',
        responded: true,
        // _id: ObjectId("62c31c1a218be8ba2e7ddbed"),
        // lastResponded: ISODate("2022-07-04T16:58:02.545Z")
      }
    ],
    username: 'satishkumar',
    // dateSent: ISODate("2022-07-04T16:58:02.540Z"),
    ratings: { rating: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 3 } },
    satisfied_status: { Satisfication: { Satisfied: 2, Dissatisfied: 1, NSND: 0 } },
    __v: 0
  }
]

export const tableData = [
  { 
     tableHeader:[{title:"rating"},{title:"productReview"},{title:"Productdesc"},{title:"email"}],
     tableBody:[
      {
       rating:"1",
       productReview: "good",
       productdesc:"good product",
       email:"mkr.dasari@gmail.com"
      },
       {
       rating:"2",
       productReview: "bad",
       productdesc:"bad product",
       email:"satishalapati502@gmail.com"
      }
  ]
  },
  { 
     tableHeader:[{title:"rating"},{title:"productReview"},{title:"Productdesc"},{title:"email"}],
     tableBody:[
      {
       rating:"1",
       productReview: "good",
       productdesc:"good product",
       email:"mkr.dasari@gmail.com"
      },
       {
       rating:"2",
       productReview: "bad",
       productdesc:"bad product",
       email:"satishalapati502@gmail.com"
      }
  ]
  }
  ]