const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser.js');
const Subscription=require('../models/Subscription')

router.get('/fetchPlan', fetchuser, async (req, res) => {
    try {
        const plan = await Subscription.find({ user: req.user.id });
        res.json(plan)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.post('/addPlan', fetchuser, async (req, res) => {
        try {
            const { plan_duration,plan_type } = req.body;
            let plan = await Subscription.findOne({user:req.user.id});
            if(!plan){
                const plan = new Subscription({
                    plan_duration,plan_type , user: req.user.id
                })
                const savedplan = await plan.save()
    
                res.json(savedplan)
            }
            else{
                const newPlan = {};
            newPlan.plan_duration = plan_duration;
            newPlan.plan_type = plan_type;
            newplan = await Subscription.findByIdAndUpdate(plan.id, { $set: newPlan }, { new: true })
            res.json({ newPlan });
            }
            

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    router.post('/deletePlan', fetchuser, async (req, res) => {
        try {
            const newPlan = {};
            newPlan.plan_duration = "";
            newPlan.plan_type = "";
    
            // Find the note to be updated and update it
            let plan = await Subscription.findOne({user:req.user.id});
            if (!plan) { return res.status(404).send("Not Found") }
            newplan = await Subscription.findByIdAndUpdate(plan.id, { $set: newPlan }, { new: true })
            res.json({ newPlan });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    module.exports = router