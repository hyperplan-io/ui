const projects = [
    {
        "id": "kaggle-titanic",
        "name": "Kaggle Titanic",
				"description": "The projects aims to find if the titanic members did survive or not",
        "problem": "classification",
        "algorithms": [],
        "policy": {
            "class": "NoAlgorithm"
        },
        "configuration": {
            "features": {
                "id": "titanic",
                "data": [
                    {
                        "name": "passengerId",
                        "type": "Float",
                        "description": "The unique identifier of the passenger"
                    },
                    {
                        "name": "pClass",
                        "type": "Int",
                        "description": "Class of travel"
                    },
                    {
                        "name": "name",
                        "type": "String",
                        "description": "Name of passenger"
                    },
                    {
                        "name": "sex",
                        "type": "String",
                        "description": "Gender"
                    },
                    {
                        "name": "age",
                        "type": "Int",
                        "description": "Age"
                    },
                    {
                        "name": "sibSp",
                        "type": "Int",
                        "description": "Number of Sibling/Spouse aboard"
                    },
                    {
                        "name": "pArch",
                        "type": "Int",
                        "description": "Number of Parent/Child aboard"
                    },
                    {
                        "name": "ticket",
                        "type": "String",
                        "description": "The ticket identifier"
                    },
                    {
                        "name": "fare",
                        "type": "Float",
                        "description": "Which fare"
                    },
                    {
                        "name": "cabin",
                        "type": "String",
                        "description": "Which cabin"
                    },
                    {
                        "name": "embarked",
                        "type": "String",
                        "description": "The port in which a passenger has embarked. C - Cherbourg, S - Southampton, Q = Queenstown"
                    }
                ]
            },
            "labels": {
                "id": "kaggle-titanic",
                "data": {
                    "type": "dynamic",
                    "description": "Whether or not the person survived"
                }
            }
        }
    }
];

export default projects;
