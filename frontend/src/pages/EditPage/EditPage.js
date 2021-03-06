import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/index";
import Spinner from "../../components/Spinner/Spinner";
import UserInfo from "../../components/UserProfile/UserInfo";
import EditInfo from "../../components/UserProfile/EditInfo";
import Confirmation from "../Modal/Confirmation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/User";
import { DELETE_ACCOUNT_MUTATION } from "../../graphql/mutations/DeleteAccount";
import React, { useState } from "react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

const ProfilePage = ({ handleLogOut }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [avt, setAvt] = useState("");
  const [err, setErr] = useState("");
  const [required, setRequired] = useState(false);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT_MUTATION);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: id },
  });

  const handleConfirmationModal = () => setShowConfirmation(false);
  const handleDelete = () => {
    deleteAccount({
      onError: (error) => {
        setErr(error.message);
      },
      onCompleted: (data) => {
        navigate("/");
      },
    });
  };

  const getImgArr = () => {
    let images = [];
    if (data.userById.photo)
      data.userById.photo.map((pic) => {
        pic.large ? images.push(pic.large) : images.push(pic.origin);
        return "";
      });

    return images;
  };

  return (
    <>
      <Navbar handleLogOut={handleLogOut} />
      {loading && <Spinner />}
      {error && (
        <div className="flex h-screen w-full justify-center items-center">
          <div className="text-2xl">
            An error occurs! Please try again later 😕
          </div>
        </div>
      )}

      {!loading && data && (
        <main>
          {showConfirmation && (
            <div
              onClick={(e) => {
                if (e.currentTarget.firstChild === e.target) {
                  handleConfirmationModal();
                }
              }}
            >
              <Confirmation
                title="Delete account"
                content={
                  err !== ""
                    ? err
                    : "Are you sure to permanently delete your account?"
                }
                handleShow={handleConfirmationModal}
                handleCancel={handleConfirmationModal}
                handleConfirm={handleDelete}
              />
            </div>
          )}
          <>
            <UserInfo
              isEdit={true}
              user={data.userById}
              newAvt={setAvt}
              isRequired={setRequired}
              showDeleteConfirm={setShowConfirmation}
            />
            <EditInfo
              id={id}
              user={data.userById}
              avt={avt}
              requiredAvt={required}
              photos={getImgArr()}
            />
          </>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
