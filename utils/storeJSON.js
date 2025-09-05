function saveStroeToJson(data,filename){
// 生成 JSON 文件并下载
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}`; // 文件名固定为 search.json
    document.body.appendChild(a);
    a.click();

    // 清理资源
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log("search.json 文件已生成，请保存");
}

export  {
    saveStroeToJson,
}