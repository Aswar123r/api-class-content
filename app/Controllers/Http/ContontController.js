'use strict'

const hash = use('Hash')
const ClassContent = use('App/Models/ClassContent');
const Section = use('App/Models/Section');
const Video = use('App/Models/Video');
const Database = use('Database')
class ContontController {
/** fungsion delete data */
  async deleteClass ({request, response }) {
    var data = request.only(['Class_name'])
    console.log(data.Class_name)
    var data_class2 = await Database.select('id').from('class_contents').where('Class_name', data.Class_name)
    console.log(data_class2[0])
    if(data_class2[0] == undefined){
      return response.status(200).json({
        status : "FAILED",
        message : "data does not exist or has been deleted"
      })
    }
    const data_setion = await Database.select('id').from('sections').where('id_class', data_class2[0].id)
    var g = 0;
    for (var i = 0; i < data_setion.length; i++){
      var data_baru = data_setion[g].id
      console.log(data_baru)
     await Database.table('videos').where('id_section',`${data_baru}`).delete()
    g++;
    }
    await Database.table('sections').where('id_class',`${data_class2[0].id}`).delete()
    await Database.table('class_contents').where('Class_name',`${data.Class_name}`).delete()
    return response.status(200).json({
      status: "SUCCESS", 
      message: "delete data successfully",
  })


}

async deleteSection ({request, response}){
  const data = request.only(['Section'])
  const data_section = await Database.select('id').from('sections').where('Section', data.Section)
  if(data_section[0]== undefined){
    return response.status(200).json({
      status : "FAILED",
      message : "data does not exist or has been deleted"
    })
  }
  await Database.table('videos').where('id_section',data_section[0].id).delete()
  console.log(data.Section)
  await Database.table('sections').where('Section',data.Section).delete()
  return response.status(200).json({
    status : 'SUCCES',
    message : 'delete data seccesfully'
  })
}

async deleteVideo ({request, response}){
  const data = request.only(['Title'])
  const data_video = await Database.select('id').from('videos').where('Title', data.Title)
  console.log(data_video[0].id)
  if(data_video[0] == undefined){
    return response.status(200).json({
      status : 'FAILED',
      message : 'data does not exist or has been deleted'
    })
  }
  await Database.table('videos').where('id',data_video[0].id ).delete()
  return response.status(200).json({
    status : 'SUCCESs',
    message : 'delete data succesfully'
  })
}
/** delete his here  */


/** fungtion update data */
async updateClass ({request, response}){
  const data = request.only(['Class_name_before', 'Class_name_after', 'Description'])
  const userExit = await ClassContent.findBy('Class_name', data.Class_name_after)
  console.log(data.Description)
          if (userExit || data.Class_name_after == undefined){
            return response.status(200).json({
              status: "FAILED", 
              message: "this is alredy data like that",
          })
          }else if (data.Description == undefined){
            await Database
            .table('class_contents').where('Class_name', data.Class_name_before)
            .update({Class_name: data.Class_name_after})
            return response.status(200).json({
              status: "SUCCESS", 
              message: "data entered successfully",
              
          })
          }else {
            await Database
            .table('class_contents').where('Class_name', data.Class_name_before)
            .update({Class_name: data.Class_name_after, Description: data.Description })
            return response.status(200).json({
              status: "SUCCESS", 
              message: "data entered successfully"
              
          })
          }
}


/** fungtion insert data */
    async insert ({ request, response}) {
          const data = request.only(['Class_name'])
          const userExit = await ClassContent.findBy('Class_name',data.Class_name)
          if (userExit){
            return response.status(200).json({
              status: "FAILED", 
              message: "this is alredy data like that",
          })
          }
          const Class_name = request.input('Class_name')
          const Description = request.input('Description')
          await Database
          .table('class_contents')
          .insert({Class_name: `${Class_name}`, Description: `${Description}`})
    
          let detail_data_User = await Database.from('class_contents').where('Class_name',`${Class_name}`)
          return response.status(200).json({
            status: "SUCCESS", 
            message: "data entered successfully",
            data:detail_data_User[0],
            
        })
      
      }
      
      async insertv2 ({ request, response}) {
          const data = request.only(['Class_name','Section'])
          const userExit = await Section.findBy('Section', data.Section)
          if (userExit){
            return response.status(200).json({
              status: "FAILED", 
              message: "this is alredy data like that",
          })
          }
          const section = data.Section
          const data_id = await Database.select('id').from('class_contents').where('Class_name',data.Class_name)
              await Database
              .table('sections')
              .insert({Section: `${section}`, id_class: `${data_id[0].id}`})
              let detail_data = await Database.select('*').from('sections').where('Section', data.Section)
              return response.status(200).json({
                status: "SUCCESS", 
                message: "data entered successfully ",
                data:detail_data[0],
                
            })
          
          }
          async insertv3 ({ request, response}) {
            const data = request.only(['Section','Title', 'Video_link'])
            const userExit = await Video.findBy('Title', data.Title)
          if (userExit){
            return response.status(200).json({
              status: "FAILED", 
              message: "this is alredy data like that",
          })
          }
            const Title = data.Title
            const Video_link = data.Video_link
            const data_id = await Database.select('id').from('sections').where('Section',data.Section)
           
                await Database
                .table('videos')
                .insert({Title: `${Title}`, Video_link: `${Video_link}`, id_section: `${data_id[0].id}`})
          
                let detail_data = await Database.select('*').from('videos')
                return response.status(200).json({
                  status: "SUCCESS", 
                  message: "data entered successfully",
                  data:detail_data[0],
                  
              })
            
          }

        /** delete data his here */

        /** read data */

            async data_kelas ({request, response}){
             const  data = request.only(['class_name'])
             const userExit = await ClassContent.findBy('Class_name', data.class_name)
             console.log(userExit)
             if(!userExit|| userExit == null ){
               return response.status(200).json({
                 status : "FAILED",
                 message : "data does not exist or has been deleted"
               })
             }
             const Exit = await Section.findBy('id_class', data.class_name)
             if(!Exit){
                
              return response.status(200).json({
                status : "FAILED",
                message : "data does not exist or has been deleted"
              })
            }
             const data_id = await Database.select('id').from('class_contents').where('Class_name', data.class_name)
             const data_id2 = await Database.select('Section').from('sections').where('id_class',data_id[0].id )
             var data2 = await Database
             .table('class_contents')
             .innerJoin('sections', 'class_contents.id', 'sections.id_class')
             const all = await Database.select('Section').from('sections').where('id_class',data_id[0].id)
             console.log(all)
              return response.status(200).json({
                status: "SUCCESS", 
                message: "display class data",
                data:data2,
                
            })
          }

            async data_class ({response}){
              const all3 = await Database.select('*').from('sections')
              var data_ayam = await Database.select('*').from('videos').where('id_section', all3[0].id)
              var h = 0;
              console.log(data_ayam)
              for (var y = 0; y < all3.length; y++){
                var data_ayam = await Database.select('*').from('videos').where('id_section', all3[h].id)
                console.log(data_ayam)
                var data_kelas12 = all3
                data_kelas12[h].id_section = data_ayam
                h++;
              }

                const all_data = await Database.select('id','Class_name','Description').from('class_contents')
                var n = 0;
                for (var i = 0; i < all_data.length; i++){
                  var data_kelas = await Database.select('Section','id_class').from('sections').where('id_class', all_data[n].id) 
                  var data_class1 = all_data  

                  data_class1[n].Description = data_kelas
                  n++;
                }

                  return response.status(200).json({
                    status: "SUCCESS", 
                    message: "data berhasil di input",
                    data:data_kelas12,
                    
                })
           }
}

module.exports = ContontController
