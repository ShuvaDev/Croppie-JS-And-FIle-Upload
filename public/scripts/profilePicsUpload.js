window.onload = function() {
    var basic = $('#cropped-image').croppie({
        viewport: { width: 200, height: 200 },
        boundary: { width: 300, height: 300 },
        showZoomer: true
    });

    function readableFile(file) {
        var reader = new FileReader();
    
        reader.onload = function (e) {
            $('#cropped-image').croppie('bind', {
                url: e.target.result
            }).then(() => {
                $('.cr-slider').attr({
                    'min': 0.5000,
                    'max': 1.5000
                })
            })
        }
    
        reader.readAsDataURL(file);
    }
    
    $('#profilePicsFile').on('change', function(e) {
        if(this.files[0]) {
            readableFile(this.files[0])
            $('#crop-modal').modal({
                backdrop: 'static',
                keyboard: true
            })
        }
    }) 

    $('#cancel-cropping').on('click', function(e) {
        $('#crop-modal').modal('hide')
        setTimeout(() => {
            $('#crop-modal').croppie('destroy')
        }, 1000);
    })

    $('#upload-image').on('click', function() {
        basic.croppie('result', 'blob')
        .then(blob => {
            let formData = new FormData()
            let file = document.getElementById('profilePicsFile').files[0]
            let name = generateFileName(file.name)
            formData.append('profilePics', blob, name)

            let headers = new Headers()
            headers.append('Accept', 'Applicatin/JSON')

            let req = new Request('/uploads/profilePics', {
                method: 'POST',
                headers,
                mode: 'cors',
                body: formData
            })

            return fetch(req)
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('profilePics').src = data.profilePics
            document.getElementById('profilePicsForm').reset()

            $('#crop-modal').modal('hide')
            setTimeout(() => {
                $('#crop-modal').croppie('destroy')
            }, 1000);
        })
    })

    function generateFileName(name) {
        const types = /(.jpeg | .jpg | .png | .gif)/
        return name.replace(types, '.png')
    }
}