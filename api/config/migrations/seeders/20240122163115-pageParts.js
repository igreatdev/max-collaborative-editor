'use strict';

const data = [
  {
    "id": 1,
    "page_id": 1,
    "title": "Hero title text",
    "slug": "hero-title-text",
    "content_type": "text",
    "content": "A trusted platform for valued investments",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 2,
    "page_id": 1,
    "title": "Hero description text",
    "slug": "hero-description-text",
    "content_type": "text",
    "content": "Valued Trust Cooperative is an evolving organization of like minds passionate about creating wealth through entrepreneurship development, community initiatives, and peer-to-peer engagements.",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 3,
    "page_id": 1,
    "title": "Hero side image",
    "slug": "hero-side-image",
    "content_type": "image",
    "content": "https://www.ellab.com/wp-content/uploads/2021/09/working-at-ellab-values.png",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 4,
    "page_id": 1,
    "title": "About title text",
    "slug": "about-title-text",
    "content_type": "text",
    "content": "A trusted platform for valued investments",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 5,
    "page_id": 1,
    "title": "About text",
    "slug": "about-text",
    "content_type": "text",
    "content": "We are a dynamic and innovative cooperative society dedicated to investing in entrepreneurship activities, with a special focus on the agriculture sector. We are driven by the belief that sustainable and inclusive economic growth can be achieved through empowering entrepreneurs and promoting agricultural development..",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 6,
    "page_id": 1,
    "title": "About side image",
    "slug": "about-side-image",
    "content_type": "image",
    "content": "",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 7,
    "page_id": 1,
    "title": "About value box 1",
    "slug": "about-value-box-1",
    "content_type": "json",
    "content": `{
    \"icon\": \"ShieldFillCheck\",
    \"title\": \"Secure\",
    \"text\": \"Your investment is secure and safe because you are part of the decision-making.\"
    }`,
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 8,
    "page_id": 1,
    "title": "About value box 2",
    "slug": "about-value-box-2",
    "content_type": "json",
    "content": `{
    \"icon\": \"GraphUp\",
    \"title\": \"Value\",
    \"text\": \"You are investing in ventures that add value to the community and offer reasonable ROI.\"
    } `,
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 9,
    "page_id": 1,
    "title": "About value box 3",
    "slug": "about-value-box-3",
    "content_type": "json",
    "content": `{
    \"icon\": \"PersonCheck\",
    \"title\": \"Trust\",
    \"text\": \"You are part of every process and decision, you can trust our professional experience to guide your investments.\"
    } `,
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 10,
    "page_id": 1,
    "title": "About value box 4",
    "slug": "about-value-box-4",
    "content_type": "json",
    "content": `{
    \"icon\": \"ClockHistory\",
    \"title\": \"Transparent\",
    \"text\": \"247 updates on your investment progress and process.\"
    } `,
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 11,
    "page_id": 1,
    "title": "Our approach title text",
    "slug": "approach-title-text",
    "content_type": "text",
    "content": "What we invest in",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 12,
    "page_id": 1,
    "title": "Our Approach text",
    "slug": "approach-text",
    "content_type": "text",
    "content": `The Agricultural sector contributes around 25% of Nigeria's Gross Domestic Product (GDP) and accounts for 48% of the labour force. Through our investments, we commit to contributing to the economic development of the country while making profit.

    Since our launch, we have invested in various farming activities like plantain, palm, melon and vegetables.We've also invested into poultry.`,
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 13,
    "page_id": 1,
    "title": "Approach side image 1",
    "slug": "approach-side-image-1",
    "content_type": "image",
    "content": "",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 15,
    "page_id": 1,
    "title": "Approach side image 2",
    "slug": "approach-side-image-2",
    "content_type": "image",
    "content": "",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 16,
    "page_id": 1,
    "title": "Approach side image 3",
    "slug": "approach-side-image-3",
    "content_type": "image",
    "content": "",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  },
  {
    "id": 17,
    "page_id": 1,
    "title": "Contact side image",
    "slug": "contact-side-image",
    "content_type": "image",
    "content": "",
    "enabled": 1,
    "deletable": 0,
    "created_at": "2024-01-12 14:40:03",
    "updated_at": "2024-01-12 14:40:03",
    "deleted_at": null
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    .*/
    await queryInterface.bulkInsert('page_parts', data, {
      ignoreDuplicates: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
