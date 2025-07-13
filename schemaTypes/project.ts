import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planned', value: 'planned'},
          {title: 'In Development', value: 'in-development'},
          {title: 'Under Construction', value: 'under-construction'},
          {title: 'Operational', value: 'operational'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacityMW',
      title: 'Capacity (MW)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          {title: 'Regional Power', value: 'regional-power'},
          {title: 'Baseload Power', value: 'baseload-power'},
          {title: 'Regional Development', value: 'regional-development'},
          {title: 'Agricultural Support', value: 'agricultural-support'},
          {title: 'National Project', value: 'national-project'},
        ],
      },
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
    }),
    // Enhanced fields for detailed project information
    defineField({
      name: 'constructionTimeline',
      title: 'Construction Timeline',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date',
        },
        {
          name: 'expectedCompletion',
          title: 'Expected Completion',
          type: 'date',
        },
        {
          name: 'currentPhase',
          title: 'Current Phase',
          type: 'string',
        },
        {
          name: 'progressPercentage',
          title: 'Progress (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        },
      ],
    }),
    defineField({
      name: 'siteDetails',
      title: 'Site Details',
      type: 'object',
      fields: [
        {
          name: 'coordinates',
          title: 'Coordinates',
          type: 'string',
        },
        {
          name: 'landArea',
          title: 'Land Area (hectares)',
          type: 'number',
        },
        {
          name: 'gridConnection',
          title: 'Grid Connection Point',
          type: 'string',
        },
        {
          name: 'accessibility',
          title: 'Accessibility',
          type: 'text',
          rows: 2,
        },
      ],
    }),
    defineField({
      name: 'ppaInformation',
      title: 'Power Purchase Agreement (PPA)',
      type: 'object',
      fields: [
        {
          name: 'status',
          title: 'PPA Status',
          type: 'string',
          options: {
            list: [
              {title: 'Signed', value: 'signed'},
              {title: 'Under Negotiation', value: 'under-negotiation'},
              {title: 'Pending', value: 'pending'},
            ],
          },
        },
        {
          name: 'counterparty',
          title: 'Counterparty',
          type: 'string',
        },
        {
          name: 'duration',
          title: 'Duration (years)',
          type: 'number',
        },
        {
          name: 'tariff',
          title: 'Tariff ($/MWh)',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'governmentEndorsements',
      title: 'Government Endorsements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'ministry',
              title: 'Ministry',
              type: 'string',
            },
            {
              name: 'endorsementType',
              title: 'Endorsement Type',
              type: 'string',
            },
            {
              name: 'date',
              title: 'Date',
              type: 'date',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'localImpact',
      title: 'Local Impact',
      type: 'object',
      fields: [
        {
          name: 'jobsCreated',
          title: 'Jobs Created',
          type: 'number',
        },
        {
          name: 'localProcurement',
          title: 'Local Procurement (%)',
          type: 'number',
        },
        {
          name: 'communityBenefits',
          title: 'Community Benefits',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'environmentalImpact',
          title: 'Environmental Impact',
          type: 'text',
          rows: 3,
        },
      ],
    }),
    defineField({
      name: 'progressUpdates',
      title: 'Progress Updates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Update Date',
              type: 'date',
            },
            {
              name: 'title',
              title: 'Update Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'image',
              title: 'Update Image',
              type: 'image',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'image',
    },
  },
}) 