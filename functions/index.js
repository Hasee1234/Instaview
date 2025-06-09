const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteExpiredStories = functions.pubsub
    .schedule("every 24 hours") // Runs once daily
    .onRun(async (context) => {
      const now = admin.firestore.Timestamp.now();
      const storiesRef = admin.firestore().collection("stories");
      const expired = storiesRef.where("expireAt", "<=", now);

      const snapshot = await expired.get();
      const batch = admin.firestore().batch();

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log(`✅ Deleted ${snapshot.size} expired stories`);
      return null;
    });
