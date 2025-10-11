const video = {
  thumbnail: document.getElementById("THUMBNAIL"),
  thpreview: document.getElementById("preview"),
  title: document.getElementById("title"),
  duration: document.getElementById("duration"),
  channel: document.getElementById("channel"),
  views: document.getElementById("views"),
  date: document.getElementById("uploaded")
}
const o = {
  thumbnail: document.getElementById("oimage"),
  title: document.getElementById("otitle"),
  duration: document.getElementById("oduration"),
  channel: document.getElementById("ochannel"),
  views: document.getElementById("oviews"),
  date: document.getElementById("otime")
}
const generate = document.getElementById("generate")
const card = document.querySelector(".card")
const input = document.querySelector("input");
const preview = document.querySelector(".preview");
input.style.opacity = 0;
input.addEventListener("change", updateImageDisplay);
function updateImageDisplay() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No files currently selected for upload";
    preview.appendChild(para);
  } else {
    const list = document.createElement("ol");
    preview.appendChild(list);
    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");
      if (validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(
          file.size,)}.`;
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.alt = image.title = file.name;
        listItem.appendChild(image);
        listItem.appendChild(para);
      }
      else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }
      list.appendChild(listItem);
    }
  }
}
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];
function validFileType(file) {
  return fileTypes.includes(file.type);
}
function returnFileSize(number) {
  if (number < 1e3) {
    return `${number} bytes`;
  } else if (number >= 1e3 && number < 1e6) {
    return `${(number / 1e3).toFixed(1)} KB`;
  }
  return `${(number / 1e6).toFixed(1)} MB`;
}
function getFormattedViews(videoviews) {
  const ToK = (videoviews) => {
    let first = String(videoviews)[0];
    return first + "k";
  }
  const To10K = (videoviews) => {
    let first = String(videoviews).slice(0, 2);
    return first + "k";
  }
  const To100K = (videoviews) => {
    let first = String(videoviews).slice(0, 3);
    return first + "k";
  }
  const ToM = (videoviews) => {
    let first = String(videoviews)[0];
    return first + "M";
  }
  const To10M = (videoviews) => {
    let first = String(videoviews).slice(0, 2);
    return first + "M";
  }
  const To100M = (videoviews) => {
    let first = String(videoviews).slice(0, 3);
    return first + "M";
  }
  const ToB = (videoviews) => {
    let first = String(videoviews)[0];
    return first + "B";
  }
  const To10B = (videoviews) => {
    let first = String(videoviews).slice(0, 2);
    return first + "B";
  }
  const To100B = (videoviews) => {
    let first = String(videoviews).slice(0, 3);
    return first + "B";
  }
  let length = videoviews.toString().length
  let total_views = 0;
  switch (length) {
    case 4:
      total_views = ToK(videoviews)
      break;
    case 5:
      total_views = To10K(videoviews)
      break;
    case 6:
      total_views = To100K(videoviews)
      break;
    case 7:
      total_views = ToM(videoviews)
      break;
    case 8:
      total_views = To10M(videoviews)
      break;
    case 9:
      total_views = To100M(videoviews)
      break;
    case 10:
      total_views = ToB(videoviews)
      break;
    case 11:
      total_views = To10B(videoviews)
      break;
    case 12:
      total_views = To100B(videoviews)
      break;
    default:
      total_views = videoviews
  }
  return total_views;
}
function getFormattedDate(inputElement) {
  let total_date = "NULL";
  if (!inputElement || !inputElement.value) {
    return total_date = "Please select a date.";    
  }
  const givenDate = new Date(inputElement.value);
  if (isNaN(givenDate.getTime())) {
    return total_date = "Invalid date.";
    console.log(total_date);
  }
  const today = new Date();
  const nowLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (givenDate > nowLocal) {
    return total_date = "Sometime in near future";
    console.log(total_date);
  }
  let years = nowLocal.getFullYear() - givenDate.getFullYear();
  let months = nowLocal.getMonth() - givenDate.getMonth();
  const dayDiff = nowLocal.getDate() - givenDate.getDate();
  if (dayDiff < 0) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (years === 0 && months === 0) {
    total_date = "Earlier this month";
  } else if (years === 0) {
    total_date = `${months} Month${months !== 1 ? "s" : ""} ago`;
  } else {
    total_date = `${years} Year${years !== 1 ? "s" : ""} ${months} Month${months !== 1 ? "s" : ""} ago`;
  }
  return total_date
}
document.getElementById("generate").addEventListener("click", (e) => {
  e.preventDefault();
  const curFiles = video.thumbnail.files;
  if (curFiles && curFiles.length > 0) {
    o.thumbnail.src = URL.createObjectURL(curFiles[0]);
  }
  if (
    video.title.value.trim() == ""
    ||
    video.duration.value.trim() == ""
    ||
    video.channel.value.trim() == ""
    ||
    video.views.value.trim() == ""
    ||
    video.date.value.trim() == ""
  ) {
    toastr.options.progressBar = true;
    toastr.options.newestOnTop = false;
    toastr.options.closeButton = true;   
    toastr.error("Card couldn't be generated.", "Error !", {
      timeOut: 5000,          
      extendedTimeOut: 0
    });
    setTimeout(() => {
      toastr.warning("Input field might be Empty", {
        positionClass: "toast-bottom-right"
      });
    }, 1000);
  }
  else {
    o.title.textContent = video.title.value;
    o.duration.textContent = video.duration.value;
    o.channel.textContent = video.channel.value;
    o.views.textContent = getFormattedViews(video.views.value) + " views";
    o.date.textContent = getFormattedDate(video.date);
  card.classList.remove("hidden");
    document.getElementById("form").reset()
    toastr.success("Success Message", "TITLE")
  }  
});