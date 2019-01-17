# Train-Scheduler

1. Train Scheduler includes -

   * Train Name
    
    * Destination 
    
    * First Train Time -- in military time
    
    * Frequency -- in minutes
  
    * Calculates when the next train will arrive; this should be relative to the current time.

2. Submit Button allows inserting records into the Firebase database (CR)

3. Delete Button is added - however, it does not work well. It deletes the record pressed, but it also deletes records after the record pressed. (Example, if 4th record is clicked for deletion, 5th, 6th, so on record is deleted also). (D)

4. Update Button not added. I could not get the Delete to work, therefore, updating was a bit too hard. (U)