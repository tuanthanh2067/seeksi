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
