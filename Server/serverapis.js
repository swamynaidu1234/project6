var mj= require("mongojs");
var conn=mj("mongodb://localhost:27017/project")
var exp=require("express")
var cr=require("cors")
var app=exp();
app.use(cr())
var bp=require("body-parser")
app.use(bp.json())
app.listen(1000);
app.post("/serUserlogin",function(req,res){
    console.log(req.body.userName)
    console.log("Hi")
    conn.tbl_admin.find({uname:req.body.userName,pwd:req.body.password},
        function(err,result){
            if(result.length == 0){
                res.send({result:0})
            }else{
                res.send({result:1})
            }
    })
})
app.get("/serGetCategory",function(req,res){
     conn.tbl_category.find({},
        function (err, result) {
            if (err) {
                return res.send(err);
            }
            console.log(result)
            res.send(result);
    })
});

app.get("/serGetSubCategory",function(req,res){
     conn.tbl_subcat.find({},
        function (err, result) {
            if (err) {
                return res.send(err);
            }
            console.log(result)
            res.send(result);
    })
});

app.get("/serGetProductsBySubCatId", function(req, res) {
    const subCatId = req.query.subcatid;

    conn.tbl_products.find({ subCatId: subCatId }, function(err, result) {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});// Server File