import {createRequire} from 'module'
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
import { sendReminderEmail } from '../Utils/send-email.js';
import { Console } from 'console';
const require = createRequire(import.meta.url)
const {serve} = require('@upstash/workflow/express')

const REMINDERS = [7,5,2,1]

export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId)
    
    if(!subscription || subscription.status !== 'active'){
        return
    }

    const renewalDate = dayjs(subscription.renewalDate)

    if(renewalDate.isBefore(dayjs())){
            console.log("renewalDate has passed for subscription")
            return
    }

    for (const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day').hour(16).minute(59).second(59)
        if (reminderDate.isAfter(dayjs(),'day')){
            await sleepUntilReminder(context, `${daysBefore} days before`, reminderDate)
        }
        //console.log(dayjs().hour(5))
        console.log(reminderDate.isSame(dayjs(),'day'))
        

        if(dayjs().isSame(reminderDate, 'day')){
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription)
        }
            

    }

})

const fetchSubscription = async(context, subscriptionID) => {
    return await context.run('get subscription', async ()=> {
        return Subscription.findById(subscriptionID).populate('user', 'name email')
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`)
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async( context, label, subscription) => {
    return await context.run(label, async (context) => {
        console.log(`Triggering ${label} on ${dayjs()}`)
        await sendReminderEmail({
            to:subscription.user.email,
            type:label,
            subscription
        })
    })
}