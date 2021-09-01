let host = `https://${window.location.hostname}/`;

document.querySelector("#getVideoInfoButton").addEventListener("click", () => {
    let videoURL = document.querySelector("#videoURL").value.trim();
    if (videoURL.length == 0) {
        alert("Buddy Enter URL of video you wanna download!");
        return
    }
    fetch(`${host}videoInfo?videoURL=${videoURL}`).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        let detailsNodes = {
            thumbnail: document.querySelector(".thumbnail img"),
            title: document.querySelector(".info h1"),
            description: document.querySelector(".info p"),
            videoURL: document.querySelector("#video-URL"),
            downloadOptions: document.querySelector("#downloadOptions")
        }
        let html = "";
        for (let i = 0; i < data.formats.length; i++) {
            if (data.formats[i].container != "mp4") {
                continue;
            }
            if (data.formats[i].audioCodec == null) {
                continue;
            }
            html += `
						<option value="${data.formats[i].itag}|${data.formats[i].container}">
							${data.formats[i].container} - ${data.formats[i].qualityLabel}
						</option>
					`;
            detailsNodes.thumbnail.src = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url; // get HD thumbnail img
            detailsNodes.title.innerText = data.videoDetails.title;
            detailsNodes.description.innerText = data.videoDetails.description;

            detailsNodes.videoURL.value = videoURL;
            detailsNodes.downloadOptions.innerHTML = html;

            document.querySelector(".videoData").style.display = "block";
            document.querySelector(".videoData").scrollIntoView({
                behavior: "smooth"
            });

        }
    })

        .catch((err) => {
            alert(err);
        })


    document.querySelector("#downloadButton").addEventListener("click", function () {
        let videoURL = document.querySelector("#videoURL").value;
        let details = document.querySelector("#downloadOptions").value.split("|");
        let itag = details[0];
        let format = details[1];
        window.open(`${host}download?videoURL=${videoURL}&itag=${itag}&format=${format}`);
    })

})