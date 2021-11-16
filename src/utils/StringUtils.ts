class StringUtils {
  static cutBySymbolsLength = (string?: string, length?: number): string => {
    if (string && length) {
      return string.length > length
        ? `${string.substring(0, length)}...`
        : string.substring(0, length);
    }
    return "";
  };

  static capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  static getFileType = (fileName: string): string => {
    const fileTypeWithPoint = fileName.indexOf(".");
    return fileName.slice(fileTypeWithPoint + 1);
  };

  static convertStringToCardString = (string: string): string => {
    return string.replace(/(\d{4}(?!\s))/g, "$1 ");
  };

  static getRightDeclination = (number: number, titles: string[]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  static defineUrls(text: string) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + "</a>";
    });
  }

  static defineFileType = (fileName: string): string => {
    switch (fileName && StringUtils.getFileType(fileName)) {
      //files
      case "pdf":
        return "file";
      case "docx":
        return "file";
      case "doc":
        return "file";
        case "rar":
        return "file";
        case "txt":
          return "file";
          case "zip":
          return "file";
          case "xls":
            return "file";
            case "xlsx":
          return "file";
          case "csv":
          return "file";
          case "7z":
          return "file";
          case "gzip":
          return "file";
          case "ppt":
          return "file";
          case "pptx":
          return "file";
          case "pps":
          return "file";
          case "ppsx":
          return "file";
          case "html":
          return "file";
          case "iso":
            return "file";
            case "exe":
              return "file";
              case "djvu":
                return "file";
                case "fb2":
                  return "file";
                  case "psd":
                    return "file";
      //images
      case "png":
        return "image";
      case "jpg":
        return "image";
      case "jpeg":
        return "image";
      case "gif":
        return "image";
      //video
      case "mov":
        return "video";
      case "mp4":
        return "video";
      case "m4a":
        return "video";
      case "m4v":
        return "video";
      case "f4v":
        return "video";
      case "f4a":
        return "video";
      case "m4b":
        return "video";
      case "m4r":
        return "video";
      case "f4b":
        return "video";
      case "3gp":
        return "video";
      case "3gp2":
        return "video";
      case "3g2":
        return "video";
      case "webm":
        return "video";
      //audio
      case "mp3":
        return "audio";
      default:
        return "";
    }
  };

  static displayName = (
    email: string,
    firstName?: string,
    lastName?: string,
    username?: string
  ): string => {
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName && !lastName) return firstName;
    if (!firstName && lastName) return lastName;
    if (username) return username;
    return email;
  };
}

export default StringUtils;
