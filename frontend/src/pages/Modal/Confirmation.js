import RoundedButton from "../../components/Buttons/RoundedButton";

const Confirmation = (props) => {
  return (
    <div
      className={`fixed bg-black bg-opacity-50 overflow-auto inset-0 flex justify-center items-center h-full z-20`}
    >
      <div className="px-8 bg-white w-5/6 lg:w-1/3 md:max-w-3xl rounded-lg ">
        <h3 className="text-primary font-bold pt-5 pb-3 text-2xl text-center">
          {props.title}
        </h3>
        {props.err && (
          <span className="text-red-600 font-medium">{props.err}</span>
        )}
        {/* Contains content of the confirmation */}
        <div className="text-center text-lg my-5">{props.content}</div>
        {/* Contains the final statement for the confirmation */}
        {props.confirmState}
        <div className={`mt-5 pb-8 text-center ${props.hideBtn}`}>
          <div className="inline-block mr-2">
            <RoundedButton
              btnName={props.btn1Name}
              btnStyle={props.btn1Style}
              handleClick={props.handleCancel}
            />
          </div>

          <div className="inline-block ml-2">
            <RoundedButton
              btnStyle={props.btn2Style}
              btnName={props.btn2Name}
              handleClick={props.handleConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Confirmation.defaultProps = {
  title: "",
  content: "",
  confirmState: "", // used in game modal
  btn1Name: "No",
  btn1Style:
    "pr-10 pl-10 py-2 text-sm hover:bg-green hover:text-white hover:border-green font-bold",
  btn2Name: "Yes",
  btn2Style:
    "pr-10 pl-10 py-2 text-sm bg-white text-primary hover:bg-red-500 hover:text-white hover:border-red-500 font-bold",
  hideBtn: "", // used to hide buttons in game request
  err: "", // err might receive from edit page
};

export default Confirmation;
