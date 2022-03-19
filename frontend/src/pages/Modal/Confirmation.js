import RoundedButton from "../../components/Buttons/RoundedButton";

const Confirmation = (props) => {
  return (
    <div
      className={`fixed bg-black bg-opacity-50 overflow-auto inset-0 flex justify-center items-center h-full z-20`}
    >
      <div className="px-8 bg-white w-5/6 lg:w-1/3 md:max-w-3xl rounded-lg ">
        <h3 className="text-primary font-bold pt-5 text-2xl text-center">
          {props.title}
        </h3>
        {props.err && (
          <span className="text-red-600 font-medium">{props.err}</span>
        )}
        {/* Contains content of the confirmation */}
        <div className="text-center text-md my-5">{props.content}</div>
        {/* Contains the final statement for the confirmation */}
        <div className="text-center text-md font-medium my-5 text-primary">
          {props.confirmState}
        </div>

        <div className={`mt-5 pb-8 text-center ${props.hideBtn}`}>
          <div className="inline-block mr-2">
            <RoundedButton
              btnName={props.btn1Name}
              btnStyle={props.btnStyle}
              handleClick={props.handleCancel}
            />
          </div>

          <div className="inline-block ml-2">
            <RoundedButton
              btnStyle={props.btnStyle}
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
  btn2Name: "Yes",
  btnStyle:
    "px-10 py-2 text-sm bg-white text-primary border-primary border-[1px] hover:bg-primary hover:text-white hover:border-primary font-bold",
  hideBtn: "", // used to hide buttons in game request
  err: "", // err might receive from edit page
};

export default Confirmation;
