const initiState = {
  events: [
    { eventName: "Event 1", date: "1", eventText: "Hello" },
    { eventName: "Event 2", date: "2", eventText: "How are you" },
    { eventName: "Event 3", date: "3", eventText: "blah blah blah" }
  ]
};
const eventReducer = (state = initiState, action) => {
  switch (action.type) {
    case "CREATE_EVENT":
      console.log("created event successfully", action.event);
      return state;
    case "CREATE_EVENT_ERROR":
      console.log("fail to create an event", action.err);
      return state;
    case "GET_EVENTS":
      console.log("get all events");
      return { ...state, events: action.events };
    case "DELETE_EVENT":
      console.log("event delete successfully");
      return { ...state, events: action.events };
    default:
      return state;
  }
};
export default eventReducer;
