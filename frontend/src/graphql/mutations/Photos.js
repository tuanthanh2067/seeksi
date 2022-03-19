import { gql } from "@apollo/client";

export const UPLOAD_AVATAR = gql`
  mutation uploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      origin
      small
      medium
      large
    }
  }
`;

export const UPLOAD_PHOTOS = gql`
  mutation uploadPhotos($files: [Upload!]!, $replace: Boolean!) {
    uploadPhotos(files: $files, replace: $replace) {
      origin
      small
      medium
      large
    }
  }
`;

export const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar {
      success
      message
    }
  }
`;

export const DELETE_PHOTOS = gql`
  mutation deletePhoto($path: String!) {
    deletePhoto(path: $path) {
      success
      message
    }
  }
`;
