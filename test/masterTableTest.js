/**
@author: Piyusha Patel
@Version: 1.0.2
@Date: 17/01/2018
@description: DOIT BlockChain project
**/
'use strict';
const express = require('express');
const chai = require('chai');  
const expect = require('chai').expect;
chai.use(require('chai-http'));
const app = require('../app');

const router = express.Router();
require('../routes')(router);
app.use('/', router);
var mlog=require('mocha-logger')
var empty = require('is-empty');
var assert = require('assert');
var should = require("should");

var sinon = require('sinon');
var http = require('http');
var request = require("supertest");

var config = require('config');
var TestIp = config.get('TestIp');

var api = request("http://"+TestIp.host+":3000")



/**test case for Glucose-Master*/  
describe('Glucose Master', function() {
    it("should add Glucose master data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=GLUCOSEMASTER')
        .send({       "MEASURE_TYPE":"blood",
            "MEASURE_DESCRIPTION":"a +ve"           
            })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('MEASURE_TYPE');
        res.body.should.have.property('MEASURE_DESCRIPTION');
        res.body.data.should.equal(result.message);
      
        });
        done();
      });
      it("fields should not be empty during adding glucose-master data",function(done){
        request(app) 
        api
          .post('/addData?WIDGET=GLUCOSEMASTER')
          .send({       "MEASURE_TYPE":"",
              "MEASURE_DESCRIPTION":"a +ve"           
              })
          .set("Accept",'application/json')
          .expect(400)
          .end(function(err,res){
            res.status.should.equal(400);
            res.body.should.have.property('MEASURE_TYPE');
          res.body.should.have.property('MEASURE_DESCRIPTION');
          res.body.data.should.equal(result.message);
        
          });
          done();
        });
  
      it("should read Glucosemaster data into blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=GLUCOSEMASTER')
          .send({      "key":"GLUCOSEMASTER"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
         res.body.should.have.property('MEASURE_TYPE');
          res.body.should.have.property('MEASURE_DESCRIPTION');
          res.body.data.should.equal(result.message);
        
          });
          done();
        });
        it("this key should be valid",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=GLUCOSEMASTER')
            .send({      "key":"GLUCOSEMASTER1"
                     })
            .set("Accept",'application/json')
            .expect(404)
            .end(function(err,res){
              res.status.should.equal(404);
           res.body.should.have.property('key');
           
            res.body.data.should.equal(result.message);
          
            });
            done();
          });
       
        it("should update Glucose master data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=GLUCOSEMASTER')
              .send({       "MEASURE_TYPE":"blood",
                  "MEASURE_DESCRIPTION":"a +ve" ,
                "key":"GLUCOSEMASTER",
            "ID":"7ijklmnirec"            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('MEASURE_TYPE');
              res.body.should.have.property('MEASURE_DESCRIPTION');
              res.body.should.have.property('key');
              res.body.should.have.property('ID');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
      
        
        it("should delete GLUCOSEMASTER data from blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=GLUCOSEMASTER')
              .send({      "key":"GLUCOSEMASTER",
              "ID":"7ijkyffdssc"
                       })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
                res.body.should.have.property('ID');
                       res.body.data.should.equal(result.message);
            
              });
              done();
            }); 
            it("should feild should ot be empty during deleting glucosemaster dATA ",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=GLUCOSEMASTER')
                .send({      "key":"GLUCOSEMASTER",
                "ID":""
                         })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                  res.body.should.have.property('ID');
                         res.body.data.should.equal(result.message);
              
                });
                done();
              }); 
       

    });

    /**test case for allergy-Master*/  
describe('allergy Master', function() {
    it("should add allergy master data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=ALLERGYMASTER')
        .send({      "ALLERGY_CODE":"CODE",
        "ALLERGY_DESCRIPTION":"ALLERGY_DESCRIPTION",
        "ALLERGY_CLASSIFICATION":"ALLERGY_CLASSIFICATION"             })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('MEASURE_TYPE');
        res.body.should.have.property('MEASURE_DESCRIPTION');
        res.body.data.should.equal(result.message);
      
        });
        done();
      });

      it("fields should  not be empetr during allergy master data",function(done){
        request(app) 
        api
          .post('/addData?WIDGET=ALLERGYMASTER')
          .send({      "ALLERGY_CODE":"CODE",
          "ALLERGY_DESCRIPTION":"",
          "ALLERGY_CLASSIFICATION":"ALLERGY_CLASSIFICATION"             })
          .set("Accept",'application/json')
          .expect(400)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('MEASURE_TYPE');
          res.body.should.have.property('MEASURE_DESCRIPTION');
          res.body.data.should.equal(result.message);
        
          });
          done();
        });
  
        it("this key should be valid",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=ALLERGYMASTER')
            .send({      "key":"ALLERGYMASTER11"
                     })
            .set("Accept",'application/json')
            .expect(404)
            .end(function(err,res){
              res.status.should.equal(404);
           res.body.should.have.property('key');
           
            res.body.data.should.equal(result.message);
          
            });
            done();
          });
      



      it("should read allergymaster data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=ALLERGYMASTER')
          .send({      "key":"ALLERGYMASTER"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('key');
                   res.body.data.should.equal(result.message);
        
          });
          done();
        });   
    
        it("should update allergymaster data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=ALLERGYMASTER')
              .send({      "ALLERGY_CODE":"CODE34",
              "ALLERGY_DESCRIPTION":"ALLERGY_DESCRIPTION",
              "ALLERGY_CLASSIFICATION":"ALLERGY_CLASSIFICATION",
            "ID":"7ijklmnvfb","key":"ALLERGYMASTER"            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('ALLERGY_CODE');
              res.body.should.have.property('ALLERGY_DESCRIPTION');
              res.body.should.have.property('ALLERGY_CLASSIFICATION');
              res.body.should.have.property('key');
              res.body.should.have.property('ID');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
      
    
        it("should delete allergymaster data from blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=ALLERGYMASTER')
              .send({      "key":"ALLERGYMASTER",
              "ID":"7ijkyffdssc"
                       })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
                res.body.should.have.property('ID');
                       res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("fileds sould not be empty during deleting allergy master data blockchain",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=ALLERGYMASTER')
                .send({      "key":"ALLERGYMASTER",
                "ID":"7ijkyffdssc"
                         })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                  res.body.should.have.property('ID');
                         res.body.data.should.equal(result.message);
              
                });
                done();
              });       
    });

   /**test case for CountryState-Master*/  
describe('CountryState Master', function() {
    it("should add CountryState data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=COUNTRY_STATE')
        .send({       'STATE_CODE': "MH",
        'STATE_NAME':"MAHARASHTRA",
        'STATE_CODE_NUM': "3",
        'STATE_TYPE': "test",           })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('STATE_CODE');
        res.body.should.have.property('STATE_NAME');
        res.body.should.have.property('STATE_CODE_NUM');
        res.body.should.have.property('STATE_TYPE');
        res.body.data.should.equal(result.message);
      
        });
        done();
      });

      it("should read COUNTRY_STATE data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=COUNTRY_STATE')
          .send({      "key":"STATE"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('key');
            res.body.data.should.equal(result.message);
        
          });
          done();
        });
        it("input key should be valid",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=COUNTRY_STATE')
            .send({      "key":"COUNTRY_STATE2"
                     })
            .set("Accept",'application/json')
            .expect(404)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('key');
                     res.body.data.should.equal(result.message);
          
            });
            done();
          });     
    });  

    /**test case for DisabilityType-Master*/  
describe('DisabilityType Master', function() {
    it("should add DisabilityType data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=DISABILITYTYPE')
        .send({'DISB_CODE': "02",
        "STATUS":"ACTIVE",
        'DISB_DESCRIPTION':"testing"        
      })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
        //   res.status.should.equal(200);
        //   res.body.should.have.property('DISB_CODE');
        // res.body.should.have.property('DISB_DESCRIPTION');
        // res.body.data.should.equal(result.message);
      
        });
        done();
      });

      it("should read DisabilityType data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=DISABILITYTYPE')
          .send({      "key":"DISABILITYTYPE"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            // res.status.should.equal(200);
            // res.body.should.have.property('key');
            //        res.body.data.should.equal(result.message);
        
          });
          done();
        }); 
        it("input key should be valid",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=DISABILITYTYPE')
            .send({      "key":"DISABILITYTYPE1"
                     })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
              res.status.should.equal(400);
        //      res.body.should.have.property('key');
                     //res.body.data.should.equal(result.message);
          
            });
            done();
          });   
         
      
        it("should delete DisabilityType data into blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=DISABILITYTYPE')
              .send({       "key":"DISABILITYTYPE",
                            "ID":"7ijksik23hh"     
                           })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
            //    res.body.should.have.property('key');
          //    res.body.should.have.property('ID');
            //  res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("fields should not be empty during deleting distabilitytype data",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=DISABILITYTYPE')
                .send({       "key":"DISABILITYTYPE",
                              "ID":""     
                             })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                  res.status.should.equal(200);
                //   res.body.should.have.property('key');
                // res.body.should.have.property('ID');
              //  res.body.data.should.equal(result.message);
              
                });
                done();
              });
          
            it("should update DisabilityType data into blockchain",function(done){
                request(app) 
                api
                  .post('/updateData?WIDGET=DISABILITYTYPE')
                  .send({       "key":"DISABILITYTYPE",
                                "ID":"7ijksik23hh"   ,
                                'DISB_CODE': "122",
                                "STATUS":"ACTIVE",
                              'DISB_DESCRIPTION':"testing"    
                               })
                  .set("Accept",'application/json')
                  .expect(200)
                  .end(function(err,res){
                    res.status.should.equal(200);
                  //  res.body.should.have.property('key');
                  // res.body.should.have.property('ID');
                  // res.body.should.have.property('DISB_CODE');
                  // res.body.should.have.property('DISB_DESCRIPTION');
                //  res.body.data.should.equal(result.message);
                
                  });
                  done();
                });     
      
    });  

      /**test case for ACTIVITY_MASTER-relationship-Master*/  
describe('ACTIVITY Master', function() {
    it("should add ACTIVITY data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=PHYSICAL_ACTIVITY_MASTER')
        .send({'ACTIVITY_CODE': "03",
        "STATUS":"ACTIVE",
        'ACTIVITY_DESCRIPTION': "running"   
      })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('ACTIVITY_CODE');
        res.body.should.have.property('ACTIVITY_DESCRIPTION');
      //  res.body.data.should.equal(result.message);
      
        });
        done();
      });

      it("Record already exist for ACTIVITY MASTER widget",function(done){
        request(app) 
        api
          .post('/addData?WIDGET=PHYSICAL_ACTIVITY_MASTER')
          .send({'ACTIVITY_CODE': "03",
          'ACTIVITY_DESCRIPTION': "running",
          "STATUS":"ACTIVE"   
        })
          .set("Accept",'application/json')
          .expect(401)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('ACTIVITY_CODE');
          res.body.should.have.property('ACTIVITY_DESCRIPTION');
       //   res.body.data.should.equal(result.message);
        
          });
          done();
        });

        it("Fields should not be empty while adding ACTIVITY MASTER widget details",function(done){
          request(app) 
          api
            .post('/addData?WIDGET=PHYSICAL_ACTIVITY_MASTER')
            .send({'ACTIVITY_CODE': "03",
            'ACTIVITY_DESCRIPTION': " " ,
            "STATUS":"ACTIVE",  
          })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('ACTIVITY_CODE');
            res.body.should.have.property('ACTIVITY_DESCRIPTION');
          //  res.body.data.should.equal(result.message);
          
            });
            done();
          });
  

      it("should read activity master data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=PHYSICAL_ACTIVITY_MASTER')
          .send({      "key":"PHYSICALACTIVITY"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('key');
                 //  res.body.data.should.equal(result.message);
        
          });
          done();
        });   
      
        it("Record was not found for ACTIVITY MASTER widget on this key",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=PHYSICAL_ACTIVITY_MASTER')
            .send({      "key":"PHYSICALACTIVIT"
                     })
            .set("Accept",'application/json')
            .expect(401)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('key');
                   //  res.body.data.should.equal(result.message);
          
            });
            done();
          });   
        
          it("Field should not be empty while reading ACTIVITY MASTER widget",function(done){
            request(app) 
            api
              .post('/readData?WIDGET=PHYSICAL_ACTIVITY_MASTER')
              .send({      "key":" "
                       })
              .set("Accept",'application/json')
              .expect(400)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
                     //  res.body.data.should.equal(result.message);
            
              });
              done();
            });

        it("Should update activity master data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=PHYSICAL_ACTIVITY_MASTER')
              .send({'ACTIVITY_CODE': "CODE00",
              'ACTIVITY_DESCRIPTION': "father" ,
              "STATUS":"ACTIVE",

              "key":"PHYSICALACTIVITY",
              "ID":"7ijklmunyvvd"    
            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('ACTIVITY_CODE');
                res.body.should.have.property('ACTIVITY_DESCRIPTION');
              res.body.should.have.property('key');
              res.body.should.have.property('ID');
           //   res.body.data.should.equal(result.message);
            
              });
              done();
            });
        it("Should delete activity master data into blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=PHYSICAL_ACTIVITY_MASTER')
              .send({       "key":"PHYSICALACTIVITY",
                            "ID":"7ijksik23hh"     
                           })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
              res.body.should.have.property('ID');
            //  res.body.data.should.equal(result.message);
            
              });
              done();
            });

            it("Field should not be empty while deleting ACTIVITY MASTER widget",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=PHYSICAL_ACTIVITY_MASTER')
                .send({       "key":"PHYSICALACTIVITY",
                              "ID":" "     
                             })
                .set("Accept",'application/json')
                .expect(400)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                res.body.should.have.property('ID');
              //  res.body.data.should.equal(result.message);
              
                });
                done();
              });
      
    });  
    
    /**test case for Person-relationship-Master*/  
describe('Person-relationship Master', function() {
    it("should add Person-relationship data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=PERSON_RELATIONSHIP')
        .send({'REL_CODE': "CODE00",
        'REL_NAME': "father"     
      })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('REL_CODE');
        res.body.should.have.property('REL_NAME');
        res.body.data.should.equal(result.message);
      
        });
        done();
      });

      it("Record already exist for PERSON_RELATIONSHIP widget",function(done){
        request(app) 
        api
          .post('/addData?WIDGET=PERSON_RELATIONSHIP')
          .send({'REL_CODE': "CODE00",
          'REL_NAME': "father"     
        })
          .set("Accept",'application/json')
          .expect(401)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('REL_CODE');
          res.body.should.have.property('REL_NAME');
          res.body.data.should.equal(result.message);
        
          });
          done();
        });
  
        it("Field should not be empty while adding PERSON_RELATIONSHIP widget details",function(done){
          request(app) 
          api
            .post('/addData?WIDGET=PERSON_RELATIONSHIP')
            .send({'REL_CODE': "CODE00",
            'REL_NAME': " "     
          })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('REL_CODE');
            res.body.should.have.property('REL_NAME');
            res.body.data.should.equal(result.message);
          
            });
            done();
          });

      it("should read PERSON_RELATIONSHIP data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=PERSON_RELATIONSHIP')
          .send({      "key":"PERSONRELATIONSHIP"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('key');
                   res.body.data.should.equal(result.message);
        
          });
          done();
        });   


      it("Record was not found for PERSON_RELATIONSHIP widget on this key",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=PERSON_RELATIONSHIP')
          .send({      "key":"PERSONRELATIONSH"
                   })
          .set("Accept",'application/json')
          .expect(401)
          .end(function(err,res){
            res.status.should.equal(401);
            res.body.should.have.property('key');
                   res.body.data.should.equal(result.message);
        
          });
          done();
        });   

        it("Field should not be empty for PERSON_RELATIONSHIP widget",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=PERSON_RELATIONSHIP')
            .send({      "key":" "
                     })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('key');
                     res.body.data.should.equal(result.message);
          
            });
            done();
          });   
      
        it("should update Person-relationship data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=PERSON_RELATIONSHIP')
              .send({'REL_CODE': "CODE00",
              'REL_NAME': "father" ,
              "key":"PERSONRELATIONSHIP",
              "id":"7ijklmunyvvd"    
            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('REL_CODE');
              res.body.should.have.property('REL_NAME');
              res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
        it("should delete PERSON_RELATIONSHIP data into blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=PERSON_RELATIONSHIP')
              .send({       "key":"PERSONRELATIONSHIP",
                            "id":"7ijksik23hh"     
                           })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("Fields should not be empty during deleting person relationship data",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=PERSON_RELATIONSHIP')
                .send({       "key":"",
                              "id":"7ijksik23hh"     
                             })
                .set("Accept",'application/json')
                .expect(400)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                res.body.should.have.property('id');
                res.body.data.should.equal(result.message);
              
                });
                done();
              });
              
      
    });    

  /**
   * test case for labtest-master 
   */  

  describe('labtest Master', function() {
    it("should add labtest master data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=LABTESTMASTER')
        .send({"TEST_CODE": "TEST_CODE",
        "TEST_NAME": "TEST_NAME",
        "TEST_UOM": "TEST_UOM"   
      })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('TEST_CODE');
              res.body.should.have.property('TEST_NAME');
              res.body.should.have.property('TEST_UOM');
        res.body.data.should.equal(result.message =="fields should not be empty");
      
        });
        done();
      });

      it("should read LABTESTMASTER data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=LABTESTMASTER')
          .send({      "key":"LTMASTER"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('key');
                   res.body.data.should.equal(result.message);
        
          });
          done();
        });   
        it("input key shold be valid",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=LABTESTMASTER')
            .send({      "key":"LTMASTER12"
                     })
            .set("Accept",'application/json')
            .expect(401)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('key');
                     res.body.data.should.equal(result.message);
          
            });
            done();
          });   
      
        it("should update LABTESTMASTER data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=LABTESTMASTER')
              .send({"TEST_CODE": "TEST_CODE_00",
              "TEST_NAME": "TEST_NAME_abc",
              "TEST_UOM": "TEST_UOM"   ,
              "key":"LTMASTER",
              "id":"7ijklmunyvvd"    
            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('TEST_CODE');
              res.body.should.have.property('TEST_NAME');
              res.body.should.have.property('TEST_UOM');
              res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
        it("should delete LABTESTMASTER data into blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=LABTESTMASTER')
              .send({       "key":"LTMASTER",
                            "id":"7ijksik23hh"     
                           })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("fields should not be empty during deleting LABTESTMASTER data",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=LABTESTMASTER')
                .send({       "key":"",
                              "id":"7ijksik23hh"     
                             })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                res.body.should.have.property('id');
                res.body.data.should.equal(result.message);
              
                });
                done();
              });
              
      
    });    

/**
   * test case for bloodgroup-master 
   */  

  describe('bloodgroup-mater', function() {
    it("should add BLOODGROUP master data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=BLOODGROUP')
        .send({"BLGRP_CODE": "BLGRP_CODE",
        'BLGRP_DESCRIPTION': 'BLGRP_DESCRIPTION', 
      })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('BLGRP_CODE');
          res.body.should.have.property('BLGRP_DESCRIPTION');
          res.body.data.should.equal(result.message);
      
        });
        done();
      });
      it("feilds should not be empty during adding bloodgropmaster data",function(done){
        request(app) 
        api
          .post('/addData?WIDGET=BLOODGROUP')
          .send({"BLGRP_CODE": "",
          'BLGRP_DESCRIPTION': 'BLGRP_DESCRIPTION', 
        })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('BLGRP_CODE');
            res.body.should.have.property('BLGRP_DESCRIPTION');
            res.body.data.should.equal(result.message);
        
          });
          done();
        });
  

      it("should read BLOODGROUP data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=BLOODGROUP')
          .send({      "key":"BLGRP1234"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('key');
                   res.body.data.should.equal(result.message);
        
          });
          done();
        });   

        it("input key should be valid",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=BLOODGROUP')
            .send({      "key":"BL55555"
                     })
            .set("Accept",'application/json')
            .expect(401)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('key');
                     res.body.data.should.equal(result.message);
          
            });
            done();
          });   
       
      
        it("should update BLOODGROUP master data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=BLOODGROUP')
              .send({"BLGRP_CODE": "BLGRP_CODE",
              'BLGRP_DESCRIPTION': 'A +ve'   ,
              "key":"BLGRP1234",
              "id":"7ijklmunyvvd"    
            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('BLGRP_CODE');
              res.body.should.have.property('BLGRP_DESCRIPTION');
              
              res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
        it("should delete BLOODGROUP data into blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=BLOODGROUP')
              .send({       "key":"BLGRP1234",
                            "id":"7ijksik23hh"     
                           })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("fields should not be empty during deleting BLOODGROUP data",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=BLOODGROUP')
                .send({       "key":"",
                              "id":""     
                             })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                res.body.should.have.property('id');
                res.body.data.should.equal(result.message);
              
                });
                done();
              });
              
      
    });    

/**
   * test case for MedicineStrengthMaster-master 
   */  

  describe('MedicineStrengthMaster', function() {
    it("should add MedicineStrength Master data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=MEDICINESTRENGTHMASTER')
        .send({"STRENGTH_VALUES": "STRENGTH_VALUES"
       
      })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('STRENGTH_VALUES');
          
          res.body.data.should.equal(result.message);
      
        });
        done();
      });

      it("should read MedicineStrengthMaster data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=MEDICINESTRENGTHMASTER')
          .send({      "key":"MSMASTER"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('key');
                   res.body.data.should.equal(result.message);
        
          });
          done();
        });   
        it("input key should be valid",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=MEDICINESTRENGTHMASTER')
            .send({      "key":"MSMASTER12"
                     })
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('key');
                     res.body.data.should.equal(result.message);
          
            });
            done();
          });   
       
        it("should update MedicineStrengthMaster data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=MEDICINESTRENGTHMASTER')
              .send({ "STRENGTH_VALUES"  : "STRENGTH_VALUES",
                      "key":"MSMASTER",
                    "id":"7ijklmunyvvd"    
            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('STRENGTH_VALUES');
            
              res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
        it("should delete MedicineStrengthMaster data into blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=MEDICINESTRENGTHMASTER')
              .send({       "key":"MSMASTER",
                            "id":"7ijksik23hh"     
                           })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("fields should not be empty during deleting MEDICINESTRENGTHMASTER data",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=MEDICINESTRENGTHMASTER')
                .send({       "key":"",
                              "id":""     
                             })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                res.body.should.have.property('id');
                res.body.data.should.equal(result.message);
              
                });
                done();
              });
              
      
    });    

    /**
   * test case for MEDICINEDOSAGEMASTER 
   */  

  describe('MEDICINEDOSAGE MASTER', function() {
    it("should add MEDICINEDOSAGEMASTER  data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=MEDICINEDOSAGEMASTER')
        .send({ "DISOSAGE_VALUE":"987610"
       
      })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('STRENGTH_VALUES');
          
          res.body.data.should.equal(result.message);
      
        });
        done();
      });

      it("should read MEDICINEDOSAGEMASTER data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=MEDICINEDOSAGEMASTER')
          .send({      "key":"MDMASTER"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('key');
                   res.body.data.should.equal(result.message);
        
          });
          done();
        });   
      
        it("should update MEDICINEDOSAGEMASTER data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=MEDICINEDOSAGEMASTER')
              .send({  "DISOSAGE_VALUE":"9876543210",
                      "key":"MDMASTER",
                    "id":"50rumggwje45tsmg"    
            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('STRENGTH_VALUES');
            
              res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
        it("should delete MEDICINEDOSAGEMASTER data into blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=MEDICINEDOSAGEMASTER')
              .send({       "key":"MDMASTER",
                            "id":"50rumggwje45tsmg"     
                           })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("fields should not be empty during deleting MEDICINESTRENGTHMASTER data",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=MEDICINEDOSAGEMASTER')
                .send({       "key":"",
                "id":""    
                             })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                res.body.should.have.property('id');
                res.body.data.should.equal(result.message);
              
                });
                done();
              });
              
      
    });    


   /**
   * test case for MedicineIntakeMaster 
   */  

  describe('MedicineIntakeMaster', function() {
    it("should add MedicineIntakeMaster  data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=MEDICINEINTAKEMASTER')
        .send({ "INTAKE_VALUE": "test"
       
      })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('INTAKE_VALUE');         
          res.body.data.should.equal(result.message);
      
        });
        done();
      });

      it("Record already exist for MedicineIntakeMaster data into blockchain",function(done){
        request(app) 
        api
          .post('/addData?WIDGET=MEDICINEINTAKEMASTER')
          .send({ "INTAKE_VALUE": "test"        
        })
          .set("Accept",'application/json')
          .expect(401)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('INTAKE_VALUE');         
            res.body.data.should.equal(result.message);
        
          });
          done();
        });

        it("Field should not be empty for MedicineIntakeMaster data into blockchain",function(done){
          request(app) 
          api
            .post('/addData?WIDGET=MEDICINEINTAKEMASTER')
            .send({ "INTAKE_VALUE": ""        
          })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('INTAKE_VALUE');         
              res.body.data.should.equal(result.message);
          
            });
            done();
          });

      it("should read MedicineIntakeMaster data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=MEDICINEINTAKEMASTER')
          .send({      "key":"MIMASTER"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('key');
                   res.body.data.should.equal(result.message);
        
          });
          done();
        });   

        it("Record was not found for MedicineIntakeMaster data on this key",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=MEDICINEINTAKEMASTER')
            .send({      "key":"MIMASTE"
                     })
            .set("Accept",'application/json')
            .expect(401)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('key');
                     res.body.data.should.equal(result.message);
          
            });
            done();
          });   

          it("Field should not be empty for MedicineIntakeMaster data",function(done){
            request(app) 
            api
              .post('/readData?WIDGET=MEDICINEINTAKEMASTER')
              .send({      "key":" "
                       })
              .set("Accept",'application/json')
              .expect(400)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
                       res.body.data.should.equal(result.message);
            
              });
              done();
            });   
      
        it("should update MedicineIntakeMaster data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=MEDICINEINTAKEMASTER')
              .send({  "INTAKE_VALUE": "2time",
                      "key":"MIMASTER",
                    "id":"50rumggwje45tsmg"    
            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('INTAKE_VALUE');
              res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
        it("should delete MedicineIntakeMaster data into blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=MEDICINEINTAKEMASTER')
              .send({       "key":"MIMASTER",
                            "id":"50rumggwje45tsmg"     
                           })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
              res.body.should.have.property('id');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("Fields should not be empty during deleting MedicineIntakeMaster data",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=MEDICINEINTAKEMASTER')
                .send({       "key":"",
                "id":"50rumggwje45tsmg"    
                             })
                .set("Accept",'application/json')
                .expect(400)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                res.body.should.have.property('id');
                res.body.data.should.equal(result.message);
              
                });
                done();
              });
              
      
    });
    
/**
   * test case for share_config_url
   */  

  describe('share_config_url', function() {
    it("should add share_config_url  data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=SHAREURL_CONFIGMASTER')
        .send({ 
          "URL_ID":"09",
          "CON_MODE":"CON_MODEtest3",
          "CON_URL":"test",
          "PARAM_NAME":"PARAM_NAMEtesr",
          "CLIENT_ID":"cd45",
          "RU_PARAM":"RU_PARAMtest" 
      })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('URL_ID');
          res.body.should.have.property('CON_MODE');
          res.body.should.have.property('CON_URL');
          res.body.should.have.property('PARAM_NAME');
          res.body.should.have.property('CLIENT_ID');
          res.body.should.have.property('RU_PARAM');
          res.body.data.should.equal(result.message);
      
        });
        done();
      });

      it("Record already exist for share_config_url data",function(done){
        request(app) 
        api
          .post('/addData?WIDGET=SHAREURL_CONFIGMASTER')
          .send({ 
            "URL_ID":"09",
            "CON_MODE":"CON_MODEtest3",
            "CON_URL":"test",
            "PARAM_NAME":"PARAM_NAMEtesr",
            "CLIENT_ID":"cd45",
            "RU_PARAM":"RU_PARAMtest" 
        })
          .set("Accept",'application/json')
          .expect(401)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('URL_ID');
          res.body.should.have.property('CON_MODE');
          res.body.should.have.property('CON_URL');
          res.body.should.have.property('PARAM_NAME');
          res.body.should.have.property('CLIENT_ID');
          res.body.should.have.property('RU_PARAM');
            res.body.data.should.equal(result.message);
        
          });
          done();
        });

        it("Field should not be empty for share_config_url widget",function(done){
          request(app) 
          api
            .post('/addData?WIDGET=SHAREURL_CONFIGMASTER')
            .send({ 
              "URL_ID":"09",
              "CON_MODE":"CON_MODEtest3",
              "CON_URL":" ",
              "PARAM_NAME":"PARAM_NAMEtesr",
              "CLIENT_ID":" ",
              "RU_PARAM":"RU_PARAMtest" 
          })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('URL_ID');
              res.body.should.have.property('CON_MODE');
              res.body.should.have.property('CON_URL');
              res.body.should.have.property('PARAM_NAME');
              res.body.should.have.property('CLIENT_ID');
              res.body.should.have.property('RU_PARAM');          
              res.body.data.should.equal(result.message);
          
            });
            done();
          });
  

      it("should read SHAREURL_CONFIGMASTER data from blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=SHAREURL_CONFIGMASTER')
          .send({      "key":"SHAREURLCONFIG"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.have.property('key');
            res.body.data.should.equal(result.message);
        
          });
          done();
        });   

        it("Record was not found for SHAREURL_CONFIGMASTER on this key",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=SHAREURL_CONFIGMASTER')
            .send({      "key":"SHAREURLCONF"
                     })
            .set("Accept",'application/json')
            .expect(401)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('key');
              res.body.data.should.equal(result.message);
          
            });
            done();
          });   
      

        it("Field should not be empty for SHAREURL_CONFIGMASTER widget",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=SHAREURL_CONFIGMASTER')
            .send({      "key":" "
                     })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('key');
                     res.body.data.should.equal(result.message);
          
            });
            done();
          });   

        it("should update SHAREURL_CONFIGMASTER data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=SHAREURL_CONFIGMASTER')
              .send({  
              "key":"ascd",
              "URL_ID": "067",
              "CON_MODE": "CON_MODEtest3",
              "CON_URL": "www.testgoogle.com",
              "CREATED_ON": "28/02/2018",              
              "PARAM_NAME": "PARAM_NAMEtesr",
              "CLIENT_ID": "cd99",
              "RU_PARAM": "RU_PARAMtest",
              "ID": "7i3h4nd6fje715ot8"    
            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.status.should.equal(200);
                res.body.should.have.property('URL_ID');
                res.body.should.have.property('CON_MODE');
                res.body.should.have.property('CON_URL');
                res.body.should.have.property('CREATED_ON');
                res.body.should.have.property('PARAM_NAME');
                res.body.should.have.property('CLIENT_ID');
                res.body.should.have.property('RU_PARAM');                 
              res.body.should.have.property('key');
              res.body.should.have.property('ID');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
        it("should delete SHAREURL_CONFIGMASTER data into blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=SHAREURL_CONFIGMASTER')
              .send({       
                "key":"SHAREURLCONFIG",
         "ID": "7i3h4ncchje6ziqtn"               
                           })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
              res.body.should.have.property('ID');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("Fields should not be empty during deleting SHAREURL_CONFIGMASTER data",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=SHAREURL_CONFIGMASTER')
                .send({        
                  "key":"",
           "ID": "7i3h4ncchje6ziqtn"                 
                             })
                .set("Accept",'application/json')
                .expect(400)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                res.body.should.have.property('ID');
                res.body.data.should.equal(result.message);
              
                });
                done();
              });
              
      
    });    


    


