let url = location.host;//so it works locally and online

$("table").rtResponsiveTables();//for the responsive tables plugin

$("#add_drug").submit(function (event) {//on a submit event on the element with id add_drug
    alert($("#name").val() + " sent successfully!");//alert this in the browser
})



$("#update_drug").submit(function (event) {// on clicking submit
    event.preventDefault();//prevent default submit behaviour

    //var unindexed_array = $("#update_drug");
    var unindexed_array = $(this).serializeArray();//grab data from form
    var data = {}

    $.map(unindexed_array, function (n, i) {//assign keys and values from form data
        data[n['name']] = n['value']
    })


    var request = {//use a put API request to use data from above to replace what's on database
        "url": `https://${url}/api/drugs/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert(data.name + " Updated Successfully!");
        window.location.href = "/manage";//redirects to index after alert is closed
    })

})

if (window.location.pathname == "/manage") {//since items are listed on manage
    $ondelete = $("table tbody td a.delete"); //select the anchor with class delete
    $ondelete.click(function () {//add click event listener
        let id = $(this).attr("data-id") // pick the value from the data-id

        let request = {//save API request in variable
            "url": `https://${url}/api/drugs/${id}`,
            "method": "DELETE"
        }
        // bring out confirm box
        $.ajax(request).done(function (response) {// if confirmed, send API request
            alert("Drug deleted Successfully!");//show an alert that it's done
            location.reload();//reload the page
        })


    })
}

if (window.location.pathname == "/purchase") {
    //$("#purchase_table").hide();

    $("#drug_days").submit(function (event) {//on a submit event
        event.preventDefault();//prevent default submit behaviour
        $("#purchase_table").show();
        let days = +$("#days").val();
        alert("Drugs for " + days + " days!");//alert this in the browser

        // 👉 sau khi hiển thị kết quả thì thêm nút "Buy"
        if ($("#buyBtn").length === 0) {
            $("#main").append('<button id="buyBtn">Buy</button>');
        }

        // Xử lý khi nhấn mua
        $("#buyBtn").off("click").on("click", function () {
            // Lấy dữ liệu từ bảng purchase_table
            let purchaseList = [];
            $("#purchase_table tbody tr").each(function () {
                let id = $(this).find("td:eq(0)").text();
                let name = $(this).find("td:eq(1)").text();
                let cards = $(this).find("td:eq(2)").text();
                let packs = $(this).find("td:eq(3)").text();

                purchaseList.push({
                    id, name, cards, packs
                });
            });

            let request = {
                url: `http://${url}/api/purchase`,  // dùng http thay vì https cho local
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({ drugs: purchaseList })
            };

            $.ajax(request).done(function (response) {
                alert("Purchase successful!");
                console.log(response);
            }).fail(function (err) {
                alert("Purchase failed!");
                console.error(err);
            });
        });
    })
}
