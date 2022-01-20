db = new Mongo().getDB("seeksi");

db.createCollection("chat_rooms", { capped: false });

db.chat_rooms.insertMany([
  {
    roomID: { $oid: "61e760eefc13ae08fd000153" },
    pairID: [
      { $oid: "6199d9abf6a0af305d000285" },
      { $oid: "6199d9abf6a0af305d000286" },
    ],
    history: {
      key: "f1a62655-3fb4-4055-910c-229d8ebc439e",
      messages: [
        {
          messageID: { $oid: "61e760eefc13ae08fd000154" },
          createdAt: { $date: "2002-04-10T02:26:59.000Z" },
          sendBy: { $oid: "6199d9abf6a0af305d000285" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/245x100.png/5fa2dd/ffffff",
            small: "http://dummyimage.com/197x100.png/ff4444/ffffff",
            medium: "http://dummyimage.com/249x100.png/ff4444/ffffff",
            large: "http://dummyimage.com/182x100.png/cc0000/ffffff",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd000155" },
          createdAt: { $date: "2015-06-09T05:52:35.000Z" },
          sendBy: { $oid: "6199d9abf6a0af305d000286" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/144x100.png/ff4444/ffffff",
            small: "http://dummyimage.com/250x100.png/dddddd/000000",
            medium: "http://dummyimage.com/141x100.png/ff4444/ffffff",
            large: "http://dummyimage.com/213x100.png/dddddd/000000",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd000156" },
          createdAt: { $date: "2008-06-03T22:48:41.000Z" },
          sendBy: { $oid: "6199d9abf6a0af305d000285" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/215x100.png/dddddd/000000",
            small: "http://dummyimage.com/149x100.png/dddddd/000000",
            medium: "http://dummyimage.com/201x100.png/ff4444/ffffff",
            large: "http://dummyimage.com/241x100.png/dddddd/000000",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd000157" },
          createdAt: { $date: "1999-12-09T23:23:00.000Z" },
          sendBy: { $oid: "6199d9abf6a0af305d000286" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/211x100.png/5fa2dd/ffffff",
            small: "http://dummyimage.com/242x100.png/cc0000/ffffff",
            medium: "http://dummyimage.com/231x100.png/dddddd/000000",
            large: "http://dummyimage.com/141x100.png/ff4444/ffffff",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd000158" },
          createdAt: { $date: "1996-10-21T20:59:34.000Z" },
          sendBy: { $oid: "6199d9abf6a0af305d000285" },
          isSeen: true,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/155x100.png/dddddd/000000",
            small: "http://dummyimage.com/138x100.png/cc0000/ffffff",
            medium: "http://dummyimage.com/208x100.png/5fa2dd/ffffff",
            large: "http://dummyimage.com/153x100.png/dddddd/000000",
          },
        },
      ],
    },
    gameRoomID: { $oid: "6199d9fbf6a0af30a0000288" },
    isDisabled: true,
  },
  {
    roomID: { $oid: "61e760eefc13ae08fd000159" },
    pairID: [
      { $oid: "6199d9abf6a0af3047000286" },
      { $oid: "6199d9abf6a0af3047000287" },
    ],
    history: {
      key: "8a5455b9-3cae-4652-a075-bceb716f141a",
      messages: [
        {
          messageID: { $oid: "61e760eefc13ae08fd00015a" },
          createdAt: { $date: "1994-05-31T02:03:37.000Z" },
          sendBy: { $oid: "6199d9abf6a0af3047000286" },
          isSeen: true,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/205x100.png/5fa2dd/ffffff",
            small: "http://dummyimage.com/141x100.png/dddddd/000000",
            medium: "http://dummyimage.com/244x100.png/dddddd/000000",
            large: "http://dummyimage.com/216x100.png/ff4444/ffffff",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd00015b" },
          createdAt: { $date: "1994-12-31T05:23:17.000Z" },
          sendBy: { $oid: "6199d9abf6a0af3047000286" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/232x100.png/cc0000/ffffff",
            small: "http://dummyimage.com/126x100.png/dddddd/000000",
            medium: "http://dummyimage.com/221x100.png/ff4444/ffffff",
            large: "http://dummyimage.com/156x100.png/ff4444/ffffff",
          },
        },
      ],
    },
    gameRoomID: { $oid: "6199d9fbf6a0af305d000288" },
    isDisabled: false,
  },
  {
    roomID: { $oid: "61e760eefc13ae08fd00015c" },
    pairID: [
      { $oid: "6199d9abf6a0af3064000283" },
      { $oid: "6199d9abf6a0af3064000284" },
    ],
    history: {
      key: "1d60d842-07e8-4c3d-b263-8da148b65b54",
      messages: [
        {
          messageID: { $oid: "61e760eefc13ae08fd00015d" },
          createdAt: { $date: "2003-02-04T15:05:03.000Z" },
          sendBy: { $oid: "6199d9abf6a0af3064000283" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/153x100.png/ff4444/ffffff",
            small: "http://dummyimage.com/185x100.png/5fa2dd/ffffff",
            medium: "http://dummyimage.com/210x100.png/ff4444/ffffff",
            large: "http://dummyimage.com/100x100.png/cc0000/ffffff",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd00015e" },
          createdAt: { $date: "2012-10-17T22:01:47.000Z" },
          sendBy: { $oid: "6199d9abf6a0af3064000283" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/124x100.png/cc0000/ffffff",
            small: "http://dummyimage.com/144x100.png/ff4444/ffffff",
            medium: "http://dummyimage.com/147x100.png/cc0000/ffffff",
            large: "http://dummyimage.com/130x100.png/ff4444/ffffff",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd00015f" },
          createdAt: { $date: "1996-07-19T11:42:14.000Z" },
          sendBy: { $oid: "6199d9abf6a0af3064000284" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/145x100.png/dddddd/000000",
            small: "http://dummyimage.com/248x100.png/5fa2dd/ffffff",
            medium: "http://dummyimage.com/239x100.png/cc0000/ffffff",
            large: "http://dummyimage.com/216x100.png/cc0000/ffffff",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd000160" },
          createdAt: { $date: "2013-01-19T15:08:11.000Z" },
          sendBy: { $oid: "6199d9abf6a0af3064000284" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/203x100.png/dddddd/000000",
            small: "http://dummyimage.com/233x100.png/5fa2dd/ffffff",
            medium: "http://dummyimage.com/156x100.png/cc0000/ffffff",
            large: "http://dummyimage.com/218x100.png/5fa2dd/ffffff",
          },
        },
      ],
    },
    gameRoomID: { $oid: "6199d9fbf6a0af308e000285" },
    isDisabled: true,
  },
  {
    roomID: { $oid: "61e760eefc13ae08fd000161" },
    pairID: [
      { $oid: "6199d9abf6a0af30a0000285" },
      { $oid: "6199d9abf6a0af30a0000286" },
    ],
    history: {
      key: "45c4f046-5acb-4aea-bb87-7072deed5e62",
      messages: [
        {
          messageID: { $oid: "61e760eefc13ae08fd000162" },
          createdAt: { $date: "2018-12-21T10:08:18.000Z" },
          sendBy: { $oid: "6199d9abf6a0af30a0000286" },
          isSeen: true,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/245x100.png/ff4444/ffffff",
            small: "http://dummyimage.com/147x100.png/ff4444/ffffff",
            medium: "http://dummyimage.com/192x100.png/cc0000/ffffff",
            large: "http://dummyimage.com/184x100.png/ff4444/ffffff",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd000163" },
          createdAt: { $date: "1991-04-29T20:53:46.000Z" },
          sendBy: { $oid: "6199d9abf6a0af30a0000285" },
          isSeen: true,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/187x100.png/cc0000/ffffff",
            small: "http://dummyimage.com/213x100.png/ff4444/ffffff",
            medium: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
            large: "http://dummyimage.com/245x100.png/cc0000/ffffff",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd000164" },
          createdAt: { $date: "1992-10-11T23:56:43.000Z" },
          sendBy: { $oid: "6199d9abf6a0af30a0000285" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/188x100.png/cc0000/ffffff",
            small: "http://dummyimage.com/245x100.png/cc0000/ffffff",
            medium: "http://dummyimage.com/227x100.png/cc0000/ffffff",
            large: "http://dummyimage.com/218x100.png/cc0000/ffffff",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd000165" },
          createdAt: { $date: "1996-05-27T11:04:52.000Z" },
          sendBy: { $oid: "6199d9abf6a0af30a0000286" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/200x100.png/dddddd/000000",
            small: "http://dummyimage.com/181x100.png/5fa2dd/ffffff",
            medium: "http://dummyimage.com/181x100.png/cc0000/ffffff",
            large: "http://dummyimage.com/190x100.png/dddddd/000000",
          },
        },
      ],
    },
    gameRoomID: { $oid: "6199d9fbf6a0af3064000286" },
    isDisabled: true,
  },
  {
    roomID: { $oid: "61e760eefc13ae08fd000166" },
    pairID: [
      { $oid: "6199d9abf6a0af308e000282" },
      { $oid: "6199d9abf6a0af308e000283" },
    ],
    history: {
      key: "76dd8171-c868-479d-9746-b5962f4ecdb0",
      messages: [
        {
          messageID: { $oid: "61e760eefc13ae08fd000167" },
          createdAt: { $date: "1998-02-11T10:08:34.000Z" },
          sendBy: { $oid: "6199d9abf6a0af308e000283" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/116x100.png/ff4444/ffffff",
            small: "http://dummyimage.com/100x100.png/cc0000/ffffff",
            medium: "http://dummyimage.com/211x100.png/5fa2dd/ffffff",
            large: "http://dummyimage.com/142x100.png/dddddd/000000",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd000168" },
          createdAt: { $date: "1993-10-21T16:34:29.000Z" },
          sendBy: { $oid: "6199d9abf6a0af308e000282" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/197x100.png/dddddd/000000",
            small: "http://dummyimage.com/156x100.png/dddddd/000000",
            medium: "http://dummyimage.com/170x100.png/ff4444/ffffff",
            large: "http://dummyimage.com/233x100.png/dddddd/000000",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd000169" },
          createdAt: { $date: "1991-06-07T13:09:41.000Z" },
          sendBy: { $oid: "6199d9abf6a0af308e000282" },
          isSeen: true,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/117x100.png/dddddd/000000",
            small: "http://dummyimage.com/248x100.png/cc0000/ffffff",
            medium: "http://dummyimage.com/205x100.png/cc0000/ffffff",
            large: "http://dummyimage.com/175x100.png/ff4444/ffffff",
          },
        },
        {
          messageID: { $oid: "61e760eefc13ae08fd00016a" },
          createdAt: { $date: "1995-01-16T10:11:20.000Z" },
          sendBy: { $oid: "6199d9abf6a0af308e000283" },
          isSeen: false,
          content: "4d22094f3af4b0c5afb8eff1980c9b5fc5b41404",
          photo: {
            origin: "http://dummyimage.com/156x100.png/dddddd/000000",
            small: "http://dummyimage.com/247x100.png/dddddd/000000",
            medium: "http://dummyimage.com/226x100.png/cc0000/ffffff",
            large: "http://dummyimage.com/179x100.png/cc0000/ffffff",
          },
        },
      ],
    },
    gameRoomID: { $oid: "6199d9fbf6a0af3047000289" },
    isDisabled: false,
  },
]);
