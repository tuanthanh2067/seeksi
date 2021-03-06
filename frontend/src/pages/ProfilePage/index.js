import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/index";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import Spinner from "../../components/Spinner/Spinner";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/User";
import React, { useEffect } from "react";
import UserInfo from "../../components/UserProfile/UserInfo";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import { Image } from "react-shimmer";
import FallBack from "../../components/FallBack/FallBack";

const ProfilePage = ({ handleLogOut }) => {
  const { id } = useParams();

  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: { userId: id },
  });
  useEffect(() => {
    refetch();
  });
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
        <main className="mb-16">
          <UserInfo isEdit={false} user={data.userById} />

          <section className="container mx-auto mt-16 px-5">
            <LightGallery
              speed={500}
              plugins={[lgZoom]}
              download={false}
              elementClassNames="grid grid-cols-2 sm:grid-cols-3 gap-12"
            >
              {data.userById.photo.map((pic, key) =>
                pic.large ? (
                  <a
                    key={key}
                    href={`${pic.large}`}
                    className="block justify-self-center"
                  >
                    <Image
                      src={`${pic.large}`}
                      alt={key}
                      fallback={<FallBack />}
                      NativeImgProps={{
                        style: {
                          objectFit: "cover",
                          objectPosition: "center",
                        },
                      }}
                    />
                  </a>
                ) : (
                  <a
                    href={`${pic.origin}`}
                    className="block justify-self-center"
                  >
                    <Image
                      src={`${pic.origin}`}
                      alt={key}
                      fallback={<FallBack />}
                      NativeImgProps={{
                        style: {
                          objectFit: "cover",
                          objectPosition: "center",
                        },
                      }}
                    />
                  </a>
                )
              )}
            </LightGallery>
          </section>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
