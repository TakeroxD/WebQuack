
$.ajax({
	url : 'https://takeroxd.github.io/WebQuack/data/grammys.json',
	type : 'GET',
	dataType : 'json',
	success : function(data){
		let newHtml = ''
		for(let i=0 ; i<data.length ; i++){
			newHtml+=`<option value="${data[i].field_id}"> ${data[i].field} </option>`
		}
		$('#category_types').append(newHtml)
		actualizarDatos()
	},
	error : function(errorMsg){console.log("NOPE")}
})

function actualizarDatos(){
	$.ajax({
	url : 'https://takeroxd.github.io/WebQuack/data/grammys.json',
	type : 'GET',
	dataType : 'json',
	success : function(data){
		$('#category_types').on('change',function(event){
			$('#default').prop('disabled',true)
			let id = $(this).val()
			$('#nominees_section').replaceWith(`<section id="nominees_section" class="container">
													<h2>${data[id-1].field}</h1>
													<h4 class="description">${data[id-1].description}</h4>
													<section id="categories">
													</section>
												</section>`)
			for(let i=0;i<data[id-1].categories.length;i++){
				$('#categories').append(`<fieldset>
												<legend><h3>${data[id-1].categories[i].category_name}</h3></legend>
												<h4 class="description">${data[id-1].categories[i].description}</h4>
												<ul>
													<label id="dummy">
												</ul>
											</fieldset>`)
				let newList = ''
				for(let x=0;x<data[id-1].categories[i].nominees.length;x++){
					if(x == data[id-1].categories[i].winner_id - 1){
					newList+=`<li><h4 class="nominee winner">${data[id-1].categories[i].nominees[x].nominee}  - WINNER!</h4>
									<br><label class="artist">${data[id-1].categories[i].nominees[x].artist}</label>
									<br><label>${data[id-1].categories[i].nominees[x].info}</label>
								</li>`
					}else{
					newList+=`<li><h4 class="nominee">${data[id-1].categories[i].nominees[x].nominee}</h4>
									<br><label class="artist">${data[id-1].categories[i].nominees[x].artist}</label>
									<br><label>${data[id-1].categories[i].nominees[x].info}</label>
								</li>`
					}
				}
				$(dummy).replaceWith(newList)
			}
		})
	},
	error : function(errorMsg){console.log("NOPE")}
	})
}