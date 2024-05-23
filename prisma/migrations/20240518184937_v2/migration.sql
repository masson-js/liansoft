/*
  Warnings:

  - You are about to drop the column `birthday` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `curseRegistered` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfRegistration` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `knowFrom` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParticipantCourse` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateOfBirth` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referral` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ParticipantCourse" DROP CONSTRAINT "ParticipantCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantCourse" DROP CONSTRAINT "ParticipantCourse_participantId_fkey";

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "birthday",
DROP COLUMN "curseRegistered",
DROP COLUMN "dateOfRegistration",
DROP COLUMN "knowFrom",
DROP COLUMN "name",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventId" INTEGER NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "referral" TEXT NOT NULL;

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "ParticipantCourse";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "organizer" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
